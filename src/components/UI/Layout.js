import React, { useState } from 'react';
import Header from '../Header/Header';
//import { useState } from 'react/cjs/react.development';
import Nav from '../Header/Nav';
import styles from '../../styles/UI/Layout.module.scss';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const content = isMenuOpen ? (
    <Nav onSelectLink={handleCloseMenu} />
  ) : (
    children
  );

  return (
    <div className={styles.layout}>
      <Header
        isMenuOpen={isMenuOpen}
        onOpenMenu={handleOpenMenu}
        onCloseMenu={handleCloseMenu}
      />

      {content}
    </div>
  );
};

export default Layout;
