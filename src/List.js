import React, { useContext, useState } from 'react';
import { FirestoreCollection } from 'react-firestore';
import NavLinks from './NavLinks';
import useTokenHook from './useTokenHook';
import { ItemsContext } from './ItemsContext';

const List = () => {
  const { token } = useTokenHook();
  const items = useContext(ItemsContext);
  const [emptyList, setEmptyList] = useState(false);

  console.log('items', items);
  // if items === empty token associated with items
  // if (items.token === ) {
  //   setEmptyList(true);
  // }
  // maybe have a useState true and false like in AddItem when empty set to true,
  // false will show the list

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
            {emptyList ? (
              <span>Your list is empty! Please add an item</span>
            ) : (
              <ul>
                {data.map(items => (
                  <li key={items.id}>{items.name}</li>
                ))}
              </ul>
            )}
            <NavLinks />
          </div>
        );
      }}
    />
  );
};

export default List;
