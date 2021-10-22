import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Nav/Sidebar.module.scss';

const Sidebar = ({ isOpen, onSelectLink }) => {
  const sidebarClasses = isOpen
    ? styles.sidebar
    : `${styles.sidebar} ${styles.hidden}`;

  return (
    <ul className={sidebarClasses}>
      <li>
        <Link onClick={onSelectLink} to='/'>
          Home
        </Link>
      </li>
      <li>
        <Link onClick={onSelectLink} to='/trainings'>
          All trainings
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

export default Sidebar;
