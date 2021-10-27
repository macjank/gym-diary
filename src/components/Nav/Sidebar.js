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
          <Link onClick={onSelectLink} to='/login'>
            Login
          </Link>
        </li>
        <li>
          <Link onClick={onSelectLink} to='/signup'>
            Signup
          </Link>
        </li>
      </ul>
    );
  }

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
      <li onClick={handleLogout}>
        <p>Logout</p>
      </li>
    </ul>
  );
};

export default Sidebar;
