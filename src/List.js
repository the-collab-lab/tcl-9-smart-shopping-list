import React, { useContext, useState, useEffect, Fragment } from 'react';
import firebase from 'firebase';
import NavLinks from './NavLinks';
import { ItemsContext } from './ItemsContext';
import calculateEstimate from './lib/estimates';
import DetailModal from './DetailModal';
import './css/List.css';

const List = () => {
  const { items } = useContext(ItemsContext);
  const [searchTerm, setTerm] = useState('');
  const [filteredItems, setfilteredItems] = useState(items);
  const [modalData, setModalData] = useState(null);
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

  const handleDetailButton = e => {
    const selectedItem = items.filter(item => {
      return item.id === e.target.id;
    });

    setModalData(selectedItem[0]);
  };

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
    <Fragment>
      {modalData && <DetailModal data={modalData} toggle={setModalData} />}

      <div className="grocery-list">
        <h1>Items</h1>
        <div className="search-box">
          <label htmlFor="search">Search an item:</label>
          <input
            id="search"
            className="search-input"
            type="search"
            value={searchTerm}
            onChange={handleSearch}
          ></input>
        </div>

        {items.length === 0 ? (
          <h2>Your list is empty! Please add an item.</h2>
        ) : filteredItems.length === 0 ? (
          <h2>There's no match for {searchTerm}.</h2>
        ) : (
          <div className="items">
            {filteredItems.map(item => (
              <div key={item.id} className="item">
                <div
                  className={`item-control ${getClassName(
                    item.nextPurchase,
                    item.lastPurchased,
                  )}`}
                >
                  <input
                    className="item-checkbox"
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
                  <label
                    data-content={item.name}
                    className="checkbox-label"
                    htmlFor={item.id}
                    aria-label={getARIA(
                      getClassName(item.nextPurchase, item.lastPurchased),
                      item.name,
                    )}
                  >
                    {item.name}
                  </label>
                </div>
                <div className="item-buttons">
                  <span
                    aria-label="click to see more detail"
                    type="button"
                    id={item.id}
                    onClick={handleDetailButton}
                    className="detail-btn"
                  ></span>

                  <span
                    aria-label="click to delete item"
                    type="button"
                    id={item.id}
                    onClick={deleteItem}
                    className="delete-btn"
                  ></span>
                </div>
              </div>
            ))}
          </div>
        )}
        <NavLinks />
      </div>
    </Fragment>
  );
};

export default List;
