import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/NavLinks.css';

const NavLinks = () => (
  <div>
    <ul>
      <li>
        <NavLink
          to="/list"
          className="navlink"
          activeClassName="navlink-active"
        >
          List
        </NavLink>
      </li>
      <li>
        <NavLink to="/add" className="navlink" activeClassName="navlink-active">
          Add Item
        </NavLink>
      </li>
    </ul>
  </div>
);

export default NavLinks;
