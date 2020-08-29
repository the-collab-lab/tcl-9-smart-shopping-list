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
      .get()
      .then(snapshot => {
        const list = snapshot.docs.map(doc => doc.data());
        setItems(list);
      });
  }, [db, items, userToken]);

  return (
    <ItemsContext.Provider
      value={{
        updateItems: () => {
          db.collection('items')
            .where('token', '==', userToken)
            .get()
            .then(snapshot => {
              const list = snapshot.docs.map(doc => doc.data());
              setItems(list);
            });
        },
        items,
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
