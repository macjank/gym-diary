import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1>Page not found</h1>
      <Link to='/'>
        <button>Take me home</button>
      </Link>
    </div>
  );
};

export default NotFound;
