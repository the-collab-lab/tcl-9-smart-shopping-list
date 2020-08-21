import React, { createContext, useState, useEffect } from 'react';
import { db } from './lib/firebase';

const ItemsContext = createContext();

const ItemsProvider = props => {
  //set useState([]) for list
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   setItems(db.collection('items')
  //   .get()
  //   .then(snapshot => {
  //     const items = snapshot.docs.map(d => d.data()).map(data => data.name);)
  // }, []);

  return <ItemsContext.Provider>{props}</ItemsContext.Provider>;
};

export default ItemsProvider;
