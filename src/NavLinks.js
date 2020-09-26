import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/NavLinks.css';
import { BiListOl } from 'react-icons/bi';
import { BiListPlus } from 'react-icons/bi';

const NavLinks = () => (
  <div>
    <ul>
      <li>
        <NavLink
          to="/list"
          className="navlink"
          activeClassName="navlink-active"
        >
          <BiListOl /> List
        </NavLink>
      </li>
      <li>
        <NavLink to="/add" className="navlink" activeClassName="navlink-active">
          <BiListPlus /> Add Item
        </NavLink>
      </li>
    </ul>
  </div>
);

export default NavLinks;
