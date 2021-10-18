import React from 'react';
import styles from '../../styles/UI/LoadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={styles.loading}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
