import React, { createContext, useState, useEffect } from 'react';
import firebase from 'firebase';

export const ItemsContext = createContext();

const ItemsProvider = props => {
  const [items, setItems] = useState([]);
  const db = firebase.firestore();
  const userToken = localStorage.getItem('token');

  useEffect(() => {
    db.collection('items')
      .where('token', '==', userToken)
      .onSnapshot(querySnapshot => {
        const list = querySnapshot.docs.map(doc => {
          const newObj = { ...doc.data(), id: doc.id };
          return newObj;
        });
        setItems(list);
      });
  }, [db, items, userToken]);

  return (
    <ItemsContext.Provider value={items}>
      {props.children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
