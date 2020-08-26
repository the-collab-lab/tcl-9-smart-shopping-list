import React, { useContext } from 'react';
import firebase from 'firebase';
import NavLinks from './NavLinks';
import { ItemsContext } from './ItemsContext';

const List = () => {
  const items = useContext(ItemsContext);

  const now = new Date(Date.now());

  const handleChange = async e => {
    const newData = { lastPurchased: Date.now() };
    const db = firebase.firestore();

    const itemRef = db.collection('items').doc(e.target.id);
    itemRef.update(newData);
  };

  return (
    <div>
      {items ? (
        <div>
          <h1>Items</h1>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <input
                  type="checkbox"
                  onChange={handleChange}
                  id={item.id}
                  checked={
                    (item.lastPurchased &&
                      now < item.lastPurchased + 1000 * 60 * 60 * 24) ||
                    false
                  }
                  disabled={
                    item.lastPurchased &&
                    now < item.lastPurchased + 1000 * 60 * 60 * 24
                  }
                ></input>
                {item.name}
              </li>
            ))}
          </ul>
          <NavLinks />
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default List;
