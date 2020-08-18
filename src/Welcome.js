import React, { useEffect, useState } from 'react';
import getToken from './lib/tokens';
import { useHistory } from 'react-router-dom';
import { FirestoreCollection } from 'react-firestore';

const Welcome = () => {
  const [token, setToken] = useState();
  const [searchDatabase, setsearchDatabase] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/list');
    }
  }, [history]);
  const handleClick = () => {
    const token = getToken();
    localStorage.setItem('token', token);
    history.push('/list');
  };

  const handleInput = e => {
    setToken(e.target.value);
  };

  const goToList = () => history.push('/list');

  //TODO: VALIDATE USER ENTERS 3 WORDS
  const handleSubmit = e => {
    e.preventDefault();
    setsearchDatabase(true);
    console.log(token);
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
      {searchDatabase && (
        <FirestoreCollection
          path="items"
          filter={['token', '==', token]}
          render={({ loading, data }) => {
            return (
              <div>
                {data.length === 0 ? (
                  <p>Sorry not a token! Try again...</p>
                ) : null}

                {data.lenth > 0 ? goToList : null}
              </div>
            );
          }}
        />
      )}
    </div>
  );
};
export default Welcome;
