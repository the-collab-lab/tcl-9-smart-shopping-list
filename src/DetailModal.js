import React from 'react';

function DetailModal({ data, toggle }) {
  const { name, nextPurchase, numberOfPurchases, lastPurchased } = data;
  const handleClick = () => {
    toggle(null);
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={handleClick}>
          &larr;
        </span>
        <p>{name}</p>
        <p>Next Purchase:{nextPurchase}</p>
        <p>Number of purchases: {numberOfPurchases}</p>
        <p>Last Purchase: {new Date(lastPurchased).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default DetailModal;
