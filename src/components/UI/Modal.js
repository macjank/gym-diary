import React from 'react';
import styles from '../../styles/UI/Modal.module.scss';
import ReactDOM from 'react-dom';

const portalElement = document.getElementById('modal');

const Backdrop = ({ onClose }) => {
  return <div className={styles.backdrop} onClick={onClose} />;
};

const Modal = ({ children, onClose }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <div className={styles.modal}>{children}</div>,
        portalElement
      )}
    </>
  );
};

export default Modal;
