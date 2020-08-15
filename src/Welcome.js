import React, { useEffect } from 'react';
import getToken from './lib/tokens';
import { useHistory } from 'react-router-dom';

const Welcome = () => {
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
  return (
    <div>
      <p>Welcome to your smart shopping list!</p>
      <button onClick={handleClick}>Create a new list</button>
    </div>
  );
};
export default Welcome;
