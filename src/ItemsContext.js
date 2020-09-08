import React, { createContext, useState, useEffect } from 'react';
import firebase from 'firebase';
import useTokenHook from './useTokenHook';

export const ItemsContext = createContext();

const ItemsProvider = props => {
  const [items, setItems] = useState([]);
  const { token } = useTokenHook();
  const db = firebase.firestore();

  useEffect(() => {
    db.collection('items')
      .where('token', '==', token)
      .onSnapshot(querySnapshot => {
        const list = querySnapshot.docs.map(doc => {
          const newObj = { ...doc.data(), id: doc.id };
          return newObj;
        });
        setItems(list);
      });
  }, [db, token]);
  return (
    <ItemsContext.Provider
      value={{
        items,
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
