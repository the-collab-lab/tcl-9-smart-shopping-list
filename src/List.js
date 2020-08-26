import React, { useContext, useState } from 'react';
import { FirestoreCollection } from 'react-firestore';
import NavLinks from './NavLinks';
import useTokenHook from './useTokenHook';
import { ItemsContext } from './ItemsContext';

const List = () => {
  const { token } = useTokenHook();
  const items = useContext(ItemsContext);
  let emptyList = false;

  console.log('items', items);

  if (items.length === 0) {
    emptyList = true;
  }
  console.log('items length', items.length);
  console.log('empty list', emptyList);

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
            <div>
              {emptyList ? (
                <span>Your list is empty! Please add an item.</span>
              ) : (
                <ul>
                  {data.map(items => (
                    <li key={items.id}>{items.name}</li>
                  ))}
                </ul>
              )}
            </div>
            <NavLinks />
          </div>
        );
      }}
    />
  );
};

export default List;
