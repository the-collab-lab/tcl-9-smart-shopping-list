import React, { useState } from 'react';
import TokenContext from './TokenContext';
import getToken from './lib/tokens';

export default props => {
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider
      value={{
        getExistingToken: () => {
          const existingToken = localStorage.getItem('token');

          if (existingToken) {
            setToken(existingToken);
          }

          return existingToken;
        },
        createToken: () => {
          const newToken = getToken();
          localStorage.setItem('token', newToken);
          setToken(newToken);
        },
        setToken: tokenValue => {
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
