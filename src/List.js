import React, { useContext } from 'react';
import firebase from 'firebase';
import NavLinks from './NavLinks';
import { ItemsContext } from './ItemsContext';

const List = () => {
  const { items } = useContext(ItemsContext);

  const oneDayInMilliSecond = 1000 * 60 * 60 * 24;

  const now = new Date(Date.now());

  let emptyList = false;

  if (items.length === 0) {
    emptyList = true;
  }

  const handleChange = async e => {
    const newData = { lastPurchased: Date.now() };
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
