import React from 'react';
import styles from '../../styles/UI/ScrollTop.module.scss';
import { FaArrowUp } from 'react-icons/fa';

const ScrollTop = ({ onClick }) => {
  return (
    <button className={styles.scroll} onClick={onClick}>
      <FaArrowUp size='30px' color='#fff' />
    </button>
  );
};

export default ScrollTop;
