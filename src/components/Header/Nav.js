import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Header/Nav.module.scss';

const Nav = ({ onSelectLink }) => {
  return (
    <ul className={styles.nav}>
      <li>
        <Link onClick={onSelectLink} to='/'>
          Home
        </Link>
      </li>
      <li>
        <Link onClick={onSelectLink} to='/new-training'>
          Add new training
        </Link>
      </li>
      <li>
        <Link onClick={onSelectLink} to='/exercises'>
          Exercises
        </Link>
      </li>
    </ul>
  );
};

export default Nav;
