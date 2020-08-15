import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinks = () => (
  <div>
    <ul>
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
