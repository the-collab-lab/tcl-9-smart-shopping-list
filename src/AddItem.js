import React, { useState } from 'react';
import firebase from 'firebase';
import NavLinks from './NavLinks';
const AddItem = () => {
  const [inputValue, setInputValue] = useState();
  const [frequency, setFrequency] = useState(7);
  const [success, setSuccess] = useState(false);

  const addItem = event => {
    event.preventDefault();

    const db = firebase.firestore();
    const cleanInput = inputValue
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    console.log('clean input', cleanInput);

    db.collection('items')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          let item = doc.data();
          if (cleanInput === item.name) {
            return;
          }
        });
      });

    return firebase
      .firestore()
      .collection('items')
      .add({
        token: '143',
        name: inputValue,
        frequency: frequency,
        lastPurchased: null,
      })
      .then(setSuccess(true));
  };

  const handleOnChange = e => {
    setFrequency(parseInt(e.target.value, 10));
  };

  const handleInput = event => {
    const db = firebase.firestore();
    const cleanInput = inputValue
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    console.log('event', event);
    console.log(
      db
        .collection('items')
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            let items = doc.data();
            /* Make data suitable for rendering */
            console.log(items.name);
            items = JSON.stringify(items);
          });
        }),
    );

    console.log(cleanInput);
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
