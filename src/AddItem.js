import React, { useState, useContext } from 'react';
import firebase from 'firebase';
import NavLinks from './NavLinks';
const AddItem = () => {
  const items = useContext(ItemsContext);
  const [inputValue, setInputValue] = useState();
  const [frequency, setFrequency] = useState(7);
  const [success, setSuccess] = useState(false);

  const addItem = event => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));

    return firebase
      .firestore()
      .collection('items')
      .add({
        token: token,
        name: inputValue,
        frequency: frequency,
        lastPurchased: null,
      })
      .then(setSuccess(true));
  };

  const handleOnChange = e => {
    setFrequency(parseInt(e.target.value, 10));
  };

  return (
    <div>
      {localStorage.getItem('token')}
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
      <NavLinks />
    </div>
  );
};

export default AddItem;
