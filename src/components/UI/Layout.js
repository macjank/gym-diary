import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import Sidebar from '../Nav/Sidebar';
import styles from '../../styles/UI/Layout.module.scss';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.layout}>
      <Nav
        isSidebarOpen={isSidebarOpen}
        onOpenSidebar={handleOpenSidebar}
        onCloseSidebar={handleCloseSidebar}
      />

      <Sidebar isOpen={isSidebarOpen} onSelectLink={handleCloseSidebar} />

      {children}
    </div>
  );
};

export default Layout;
