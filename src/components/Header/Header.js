import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from '../../styles/Header/Header.module.scss';

const Header = ({ isMenuOpen, onOpenMenu, onCloseMenu }) => {
  const icon = isMenuOpen ? (
    <FaTimes size="3em" onClick={onCloseMenu} />
  ) : (
    <FaBars size="3em" onClick={onOpenMenu} />
  );

  return (
    <header className={styles.header}>
      <Link to="/" onClick={onCloseMenu}>
        <div>
          <h1>MyGymDiary</h1>
        </div>
      </Link>

      {icon}
    </header>
  );
};

export default Header;
