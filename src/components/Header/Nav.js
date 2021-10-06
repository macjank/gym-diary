import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ onSelectLink }) => {
  return (
    <ul>
      <li>
        <Link onClick={onSelectLink} to="/">Home</Link>
      </li>
      <li>
        <Link onClick={onSelectLink} to="/new-training">Add new training</Link>
      </li>
    </ul>
  );
};

export default Nav;
