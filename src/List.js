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
      1,
    );

    const newData = { lastPurchased: Date.now(), nextPurchase: calculatedDate };
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

  return (
    <div>
      <h1>Items</h1>
      <input type="search" value={searchTerm} onChange={handleSearch}></input>
      {items.length === 0 ? (
        <span>Your list is empty! Please add an item.</span>
      ) : filteredItems.length === 0 ? (
        <span>There's no match for {searchTerm}.</span>
      ) : (
        <ul>
          {filteredItems.map(item => (
            <li key={item.id}>
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
              {item.name}
              <button type="button" id={item.id} onClick={deleteItem}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <NavLinks />
    </div>
  );
};

export default List;
