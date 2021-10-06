import React from 'react';
import styles from '../../styles/UI/Card.module.scss';

const Card = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
