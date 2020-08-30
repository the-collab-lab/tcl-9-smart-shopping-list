import React, { useState, useContext } from 'react';
import firebase from 'firebase';
import NavLinks from './NavLinks';
import { ItemsContext } from './ItemsContext';
import useTokenHook from './useTokenHook';

const AddItem = () => {
  const { items } = useContext(ItemsContext);
  const { token } = useTokenHook();
  const [inputValue, setInputValue] = useState();
  const [frequency, setFrequency] = useState(7);
  const [success, setSuccess] = useState(false);

  const addItem = event => {
    event.preventDefault();
    const db = firebase.firestore();
    const cleanInput = inputValue
      .toLowerCase()
      .trim()
      .replace(/[.,\/#!$+%\^&\*;:{}=\-_`~()]/g, '');

    const itemNames = items.map(data => data.name);
    if (!itemNames.includes(cleanInput)) {
      db.collection('items')
        .add({
          token,
          name: inputValue,
          frequency: frequency,
          lastPurchased: null,
        })
        .then(setSuccess(true));
    } else {
      alert(cleanInput + ' already exists on your list');
    }
  };

  const handleOnChange = e => {
    setFrequency(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <form>
        <label htmlFor="item">Item</label>
        <input
          id="item"
          type="text"
          name="items"
          placeholder="enter grocery item here"
          onChange={event => setInputValue(event.target.value)}
        />
        <fieldset>
          <label htmlFor="soon">Soon</label>
          <input
            id="soon"
            name="frequency"
            type="radio"
            value={7}
            onChange={handleOnChange}
            checked={frequency === 7}
          />
          <label htmlFor="kindofsoon">Kind of Soon</label>
          <input
            id="kindofsoon"
            name="frequency"
            type="radio"
            value={14}
            onChange={handleOnChange}
            checked={frequency === 14}
          />
          <label htmlFor="notsoon">Not Soon</label>
          <input
            id="notsoon"
            name="frequency"
            type="radio"
            value={30}
            onChange={handleOnChange}
            checked={frequency === 30}
          />
        </fieldset>
        <button type="submit" onClick={event => addItem(event)}>
          submit
        </button>
      </form>
      {success ? `${inputValue} successfully added to list` : null}
      <NavLinks />
    </div>
  );
};

export default AddItem;
