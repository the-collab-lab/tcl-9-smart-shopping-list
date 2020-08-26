import React, { useContext, useEffect, useState } from 'react';
import { FirestoreCollection } from 'react-firestore';
import firebase from 'firebase';

import NavLinks from './NavLinks';
import useTokenHook from './useTokenHook';
import { ItemsContext } from './ItemsContext';

const List = () => {
  const items = useContext(ItemsContext);

  const [isLoading, setIsLoading] = useState();

  const now = new Date(Date.now());

  const db = firebase.firestore();
  const { token } = useTokenHook();
  const handleChange = async e => {
    // const checkedItem = items.filter(item => item.name === e.target.name)[0];
    // console.log(checkedItem);
    // checkedItem.lastPurchased = Date.now();
    // console.log(checkedItem);

    const newData = { lastPurchased: Date.now() };
    var itemRef = db.collection('items').doc(e.target.id);

    itemRef.update(newData);
  };

  //opus typic stag

  return (
    <div>
      {items ? (
        <div>
          <h1>Items</h1>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {console.log(item)}
                <input
                  type="checkbox"
                  onChange={handleChange}
                  id={item.id}
                  checked={
                    item.lastPurchased &&
                    now < item.lastPurchased + 1000 * 60 * 60 * 24
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
    /*<FirestoreCollection
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
                    disable={disable}
                  ></input>
                  {items.name}
                </li>
              ))}
            </ul>
            <NavLinks />
          </div>
        );
      }}
    />*/
  );
};

export default List;
