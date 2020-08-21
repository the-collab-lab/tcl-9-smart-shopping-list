import React, { createContext, useState, useEffect } from 'react';
import firebase from 'firebase';

export const ItemsContext = createContext();

const ItemsProvider = props => {
  //set useState([]) for list
  const [items, setItems] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    db.collection('items')
      .get()
      .then(snapshot => {
        const list = snapshot.docs.map(doc => doc.data());
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
