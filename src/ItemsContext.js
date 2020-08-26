import React, { createContext, useState, useEffect } from 'react';
import firebase from 'firebase';

export const ItemsContext = createContext();

const ItemsProvider = props => {
  //set useState([]) for list
  const [items, setItems] = useState([]);
  const db = firebase.firestore();
  const userToken = localStorage.getItem('token');

  useEffect(() => {
    db.collection('items')
      .where('token', '==', userToken)
      .get()
      .then(snapshot => {
        const list = snapshot.docs.map(doc => {
          const newObj = { ...doc.data(), id: doc.id };
          return newObj;
        });
        setItems(list);
      });
  }, []);

  return (
    <ItemsContext.Provider value={items}>
      {props.children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
