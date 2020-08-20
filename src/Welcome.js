import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import useTokenHook from './useTokenHook';


const Welcome = () => {
  const { getExistingToken, createToken, token, setToken } = useTokenHook();
  const [tokenQuery, setTokenQuery] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const tokenExist = getExistingToken();
    if (tokenExist) {
      history.push('/list');
    }
  }, [history]);

  const handleClick = () => {
    createToken();
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
      setToken(searchTerm);
    }
  };

  React.useEffect(() => {
    if (token) {
      history.push('/list');
    }
  }, [token]);

  //TODO: VALIDATE USER ENTERS 3 WORDS
  const handleSubmit = e => {
    e.preventDefault();
    queryDatabase(tokenQuery);
  };



  return (
    <div>
      <p>Welcome to your smart shopping list!</p>
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
