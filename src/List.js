import React, { useContext } from 'react';
import firebase from 'firebase';
import NavLinks from './NavLinks';
import { ItemsContext } from './ItemsContext';
import calculateEstimate from './lib/estimates';

const List = () => {
  const { items } = useContext(ItemsContext);

  const oneDayInMilliSecond = 1000 * 60 * 60 * 24;

  const now = new Date(Date.now());

  let emptyList = false;

  if (items.length === 0) {
    emptyList = true;
  }

  //When the user selects an item, search the items array to find the item selected.
  //Use the item's last purchased date and the frequency to calculate the estimated
  //next purchased date. Update the database with the new property items.
  const handleChange = async e => {
    const itemSelected = items.filter(ingr => {
      return ingr.id === e.target.id;
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

  return (
    <div>
      <h1>Items</h1>
      {emptyList ? (
        <span>Your list is empty! Please add an item.</span>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <input
                type="checkbox"
                onChange={handleChange}
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
            </li>
          ))}
        </ul>
      )}
      <NavLinks />
    </div>
  );
};

export default List;
