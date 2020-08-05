import React, { useState } from 'react';
import { FirestoreCollection } from 'react-firestore';

export default function FirestoreTest() {
  const [inputValue, setInputValue] = useState();

  return (
    <div>
      <FirestoreCollection
        path="items"
        render={({ isLoading, data }) => {
          return isLoading ? (
            <div>loading...</div>
          ) : (
            <div>
              <form>
                <input
                  type="text"
                  name="items"
                  placeholder="enter grocery item here"
                  onChange={event => setInputValue(event.target.value)}
                />
                <button type="submit">submit</button>
              </form>
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
