import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import NavLinks from './NavLinks';

const List = () => {
  return (
    <FirestoreCollection
      path="items"
      render={({ isLoading, data }) => {
        return isLoading ? (
          <div>loading...</div>
        ) : (
          <div>
            <h1>Items</h1>
            <ul>
              {data.map(items => (
                <li key={items.id}>{items.name}</li>
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
