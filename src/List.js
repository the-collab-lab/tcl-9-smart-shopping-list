import React, { useContext, useState, useEffect } from 'react';
import firebase from 'firebase';
import NavLinks from './NavLinks';
import { ItemsContext } from './ItemsContext';
import calculateEstimate from './lib/estimates';

const List = () => {
  const { items } = useContext(ItemsContext);
  const [searchTerm, setTerm] = useState('');
  const [filteredItems, setfilteredItems] = useState(items);
  useEffect(() => {
    setfilteredItems(items);
  }, [items]);
  const oneDayInMilliSecond = 1000 * 60 * 60 * 24;

  const now = new Date(Date.now());

  const handlePurchase = async e => {
    // will return only one item in the array
    const itemSelected = items.filter(item => {
      return item.id === e.target.id;
    });

    const lastPurchasedDate = itemSelected[0].lastPurchased
      ? itemSelected[0].lastPurchased
      : 0;

    const calculatedDate = calculateEstimate(
      lastPurchasedDate,
      itemSelected[0].frequency,
      itemSelected[0].numberOfPurchases + 1,
    );
    const newData = {
      lastPurchased: Date.now(),
      nextPurchase: calculatedDate,
      numberOfPurchases: itemSelected[0].numberOfPurchases + 1,
    };
    const db = firebase.firestore();

    const itemRef = db.collection('items').doc(e.target.id);
    itemRef.update(newData);
  };

  const handleSearch = e => {
    setTerm(e.target.value);
    const filterItems = items.filter(item => {
      return item.name.includes(e.target.value);
    });

    setfilteredItems(filterItems);
  };

  const deleteItem = e => {
    const deleteConfirm = window.confirm(
      'Are you sure you want to delete this item?',
    );
    if (deleteConfirm) {
      firebase
        .firestore()
        .collection('items')
        .doc(e.target.id)
        .delete()
        .then(function() {
          console.log('Document successfully deleted!');
        })
        .catch(function(error) {
          console.error('Error removing document: ', error);
        });
    }
  };

  const getClassName = nextPurchase => {
    console.log(nextPurchase);
  const getClassName = (nextPurchase, lastPurchased) => {
    if (
      lastPurchased &&
      Date.now() - lastPurchased > 2 * nextPurchase * oneDayInMilliSecond
    ) {
      return 'inactive';
    }
    if (nextPurchase <= 7) {
      return 'soon';
    } else if (nextPurchase < 30) {
      return 'kind-of-soon';
    } else if (nextPurchase >= 30) {
      return 'not-so-soon';
    }
  };
  const getARIA = (className, name) => {
    if (className === 'inactive') {
      return `${name} is inactive`;
    } else {
      return `this ${name} will need to be purchased ${className}`;
    }
  };

  return (
    <div>
      <h1>Items</h1>
      <label>
        Search:
        <input type="search" value={searchTerm} onChange={handleSearch}></input>
      </label>
      {items.length === 0 ? (
        <span>Your list is empty! Please add an item.</span>
      ) : filteredItems.length === 0 ? (
        <span>There's no match for {searchTerm}.</span>
      ) : (
        <ul>
          {filteredItems.map(item => (
            <li
              key={item.id}
              className={getClassName(item.nextPurchase, item.lastPurchased)}
            >
              <label
                aria-label={getARIA(
                  getClassName(item.nextPurchase, item.lastPurchased),
                  item.name,
                )}
              >
              {item.name}
              <button type="button" id={item.id} onClick={deleteItem}>
                Delete
              </button>
                <input
                  type="checkbox"
                  onChange={handlePurchase}
                  id={item.id}
                  checked={
                    (item.lastPurchased &&
                      now < item.lastPurchased + oneDayInMilliSecond) ||
                    false
                  }
                  disabled={
                    item.lastPurchased &&
                    now < item.lastPurchased + oneDayInMilliSecond
                  }
                ></input>
              </label>
            </li>
          ))}
        </ul>
      )}
      <NavLinks />
    </div>
  );
};

export default List;
