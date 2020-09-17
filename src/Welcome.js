import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import useTokenHook from './useTokenHook';

const Welcome = () => {
  const { token, setLocalStorageToken } = useTokenHook();

  const [tokenQuery, setTokenQuery] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const history = useHistory();

  const handleClick = () => {
    setLocalStorageToken();
  };

  const handleInput = e => {
    setTokenQuery(e.target.value);
  };

  const queryDatabase = async searchTerm => {
    const databaseRef = firebase.firestore().collection('items');
    const snapshot = await databaseRef.where('token', '==', searchTerm).get();
    if (snapshot.empty) {
      setShowErrorMessage(true);
    } else {
      setLocalStorageToken(searchTerm);
    }
  };

  useEffect(() => {
    if (token) {
      history.push('/list');
    }
  }, [history, token]);

  //TODO: VALIDATE USER ENTERS 3 WORDS
  const handleSubmit = e => {
    e.preventDefault();
    queryDatabase(tokenQuery);
  };

  return (
    <div className="welcome">
      <h1>Orange You Glad</h1>
      <h2>you made a list</h2>
      <button onClick={handleClick}>Create a new list</button>
      <p>-or-</p>
      <p>Join an existing shopping list by entering a three word token</p>
      <form>
        <label htmlFor="entertoken">Share token</label>
        <input
          id="entertoken"
          type="text"
          placeholder="three word token"
          onChange={handleInput}
        />
        <button type="submit" onClick={handleSubmit}>
          Join an existing list
        </button>
      </form>
      {showErrorMessage && <p>Sorry not a token! Try again...</p>}
    </div>
  );
};
export default Welcome;
