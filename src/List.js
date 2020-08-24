import React, { useContext } from 'react';
import { FirestoreCollection } from 'react-firestore';
import firebase from 'firebase';

import NavLinks from './NavLinks';
import useTokenHook from './useTokenHook';
import { ItemsContext } from './ItemsContext';

const List = () => {
  const items = useContext(ItemsContext);
  const db = firebase.firestore();
  const { token } = useTokenHook();
  const handleChange = e => {
    // const checkedItem = items.filter(item => item.name === e.target.name)[0];
    // console.log(checkedItem);
    // checkedItem.lastPurchased = Date.now();
    // console.log(checkedItem);
    const newData = { lastPurchased: Date.now() };
    var itemRef = db.collection('items').doc(e.target.id);
    itemRef.update(newData);
  };

  return (
    <FirestoreCollection
      path="items"
      filter={['token', '==', token]}
      render={({ isLoading, data }) => {
        return isLoading ? (
          <div>loading...</div>
        ) : (
          <div>
            <h1>Items</h1>
            <ul>
              {data.map(items => (
                <li key={items.id}>
                  <input
                    type="checkbox"
                    onChange={handleChange}
                    id={items.id}
                    name={items.name}
                  ></input>
                  {items.name}
                </li>
              ))}
            </ul>
            <NavLinks />
          </div>
        );
      }}
    />
  );
};

export default List;
