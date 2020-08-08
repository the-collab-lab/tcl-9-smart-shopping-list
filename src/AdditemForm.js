import React, { useState } from 'react';
import { FirestoreCollection } from 'react-firestore';
import firebase from 'firebase';

export default function AddItemForm() {
  const [inputValue, setInputValue] = useState();

  const addItem = event => {
    event.preventDefault();
    return firebase
      .firestore()
      .collection('items')
      .add({ name: inputValue });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="items"
          placeholder="enter grocery item here"
          onChange={event => setInputValue(event.target.value)}
        />
        <button type="submit" onClick={event => addItem(event)}>
          submit
        </button>
      </form>
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
            </div>
          );
        }}
      />
    </div>
  );
}
