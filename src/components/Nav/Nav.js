import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from '../../styles/Nav/Nav.module.scss';

const Nav = ({ isSidebarOpen, onOpenSidebar, onCloseSidebar }) => {
  const icon = isSidebarOpen ? (
    <FaTimes size='3em' onClick={onCloseSidebar} />
  ) : (
    <FaBars size='3em' onClick={onOpenSidebar} />
  );

  return (
    <nav className={styles.nav}>
      <Link to='/' onClick={onCloseSidebar}>
        <div>
          <h1>GymDiary</h1>
        </div>
      </Link>
      {icon}
    </nav>
  );
};

export default Nav;