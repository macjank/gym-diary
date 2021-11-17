import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import styles from '../../styles/Nav/Sidebar.module.scss';

const Sidebar = ({ isOpen, onSelectLink }) => {
  const history = useHistory();
  const { user } = useSelector(state => state.auth);

  const sidebarClasses = isOpen
    ? styles.sidebar
    : `${styles.sidebar} ${styles.hidden}`;

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    onSelectLink();
    history.replace('/');
  };

  if (!user) {
    return (
      <ul className={sidebarClasses}>
        <li>
          <Link onClick={onSelectLink} to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link onClick={onSelectLink} to="/signup">
            Signup
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className={sidebarClasses}>
      {user.displayName && (
        <div className={styles.sidebar__header}>
          You are logged in as {user.displayName}
        </div>
      )}
      <Link onClick={onSelectLink} to="/">
        <li>Home</li>
      </Link>
      <Link onClick={onSelectLink} to="/trainings">
        <li>All trainings</li>
      </Link>
      <Link onClick={onSelectLink} to="/new-training">
        <li>Add new training</li>
      </Link>
      <Link onClick={onSelectLink} to="/exercises">
        <li>Exercises</li>
      </Link>
      <Link onClick={onSelectLink} to="/statistics">
        <li>Statistics</li>
      </Link>
      <li onClick={handleLogout} className={styles.sidebar__logoutBtn}>
        Logout
      </li>
    </ul>
  );
};

export default Sidebar;
