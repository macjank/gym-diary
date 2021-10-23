import React from 'react';
import styles from '../../styles/UI/Error.module.scss';

const Error = () => {
  return (
    <div className={styles.error}>
      <h2>Something went wrong. Try again later.</h2>
    </div>
  );
};

export default Error;
