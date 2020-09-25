import React, { useState, useContext } from 'react';
import firebase from 'firebase';
import NavLinks from './NavLinks';
import { ItemsContext } from './ItemsContext';
import useTokenHook from './useTokenHook';
import './css/AddItem.css';

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
          nextPurchase: frequency,
          numberOfPurchases: 0,
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
    <div className="additem">
      <form className="additem__form">
        <label htmlFor="item" className="additem__text-label">
          Enter an item:
        </label>
        <input
          className="additem__text-input"
          id="item"
          type="text"
          name="items"
          placeholder="Enter grocery item here"
          onChange={event => setInputValue(event.target.value)}
        />
        <fieldset className="additem__fieldset">
          <legend className="additem__fieldset-legend">
            How soon do you need this item?
          </legend>
          <input
            className="additem__radio-input"
            id="soon"
            name="frequency"
            type="radio"
            value={7}
            onChange={handleOnChange}
            checked={frequency === 7}
          />
          <label htmlFor="soon" className="additem__radio-label">
            Soon
          </label>
          <input
            className="additem__radio-input"
            id="kindofsoon"
            name="frequency"
            type="radio"
            value={14}
            onChange={handleOnChange}
            checked={frequency === 14}
          />
          <label htmlFor="kindofsoon" className="additem__radio-label">
            Kind of Soon
          </label>
          <input
            className="additem__radio-input"
            id="notsoon"
            name="frequency"
            type="radio"
            value={30}
            onChange={handleOnChange}
            checked={frequency === 30}
          />
          <label htmlFor="notsoon" className="additem__radio-label">
            Not Soon
          </label>
        </fieldset>
        <button
          className="additem__button hvr-grow"
          type="submit"
          onClick={event => addItem(event)}
        >
          Submit
        </button>
      </form>
      {success ? `${inputValue} successfully added to list` : null}
      <NavLinks />
    </div>
  );
};

export default AddItem;
