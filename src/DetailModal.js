import React from 'react';
import './css/DetailModal.css';

function DetailModal({ data, toggle }) {
  const { name, nextPurchase, numberOfPurchases, lastPurchased } = data;
  const handleClick = () => {
    toggle(null);
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={handleClick}>
          ⇦
        </span>
        <p className="modal_itemname">{name}</p>
        <p>
          <span className="modal_span">Next Purchase:</span> {nextPurchase}
        </p>
        <p>
          <span className="modal_span">Number of purchases:</span>{' '}
          {numberOfPurchases}
        </p>
        <p>
          <span className="modal_span">Last Purchase:</span>{' '}
          {new Date(lastPurchased).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default DetailModal;
