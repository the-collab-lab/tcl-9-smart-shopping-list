import React from 'react';

function DetailModal({ data }) {
  const { name, nextPurchase, numberOfPurchases, lastPurchase } = data;
  return (
    <div>
      Modal
      <p>{name}</p>
      <p>Next Purchase:{nextPurchase}</p>
      <p>Number of purchases: {numberOfPurchases}</p>
      <p>Last Purchase: {lastPurchase}</p>
    </div>
  );
}

export default DetailModal;
