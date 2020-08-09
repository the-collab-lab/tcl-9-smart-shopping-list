import React, { useState } from 'react';
import firebase from 'firebase';

const AddItem = () => {
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
    </div>
  );
};

export default AddItem;
