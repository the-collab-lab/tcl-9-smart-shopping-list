import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinks = () => (
  <div className="container">
    <ul className="nav">
      <li>
        <NavLink
          to="/list"
          activeStyle={{
            fontWeight: 'bold',
          }}
        >
          List
        </NavLink>
      </li>
      <li>
        <NavLink to="/add" activeStyle={{ fontWeight: 'bold' }}>
          Add an item
        </NavLink>
      </li>
    </ul>
  </div>
);

export default NavLinks;
