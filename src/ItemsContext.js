import React, { createContext, useState, useEffect } from 'react';
import { db } from './lib/firebase';

const ItemsContext = createContext();

const ItemsProvider = props => {
  //set useState([]) for list

  useEffect(() => {
    // put ln 14-15 here?
  }, []);

  return <ItemsContext.Provider>{props}</ItemsContext.Provider>;
};

export default ItemsProvider;
