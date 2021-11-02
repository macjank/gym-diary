import React from 'react';
import styles from '../../styles/UI/Error.module.scss';

const Error = ({ info }) => {
  const content = info || 'Something went wrong. Try again later.';

  return (
    <div className={styles.error}>
      <h2>{content}</h2>
    </div>
  );
};

export default Error;
