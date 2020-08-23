import React, { useState, useEffect } from 'react';
import TokenContext from './TokenContext';
import getToken from './lib/tokens';

export default props => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getLocalStorageToken = () => {
      const existingToken = localStorage.getItem('token');

      if (existingToken) {
        setToken(existingToken);
      }
    };
    getLocalStorageToken();
  }, []);

  return (
    <TokenContext.Provider
      value={{
        setLocalStorageToken: userInput => {
          let tokenValue = null;

          if (userInput) {
            tokenValue = userInput;
          } else {
            tokenValue = getToken();
          }
          localStorage.setItem('token', tokenValue);
          setToken(tokenValue);
        },
        token,
      }}
    >
      {props.children}
    </TokenContext.Provider>
  );
};
