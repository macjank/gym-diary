import { useCallback, useState } from 'react';
import Modal from '../components/UI/Modal';
import styles from '../styles/UI/InfoModal.module.scss';
import { FaExclamationCircle } from 'react-icons/fa';

const useInfoModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  //const handleOpenModal = message => {};

  const handleOpenModal = useCallback(message => {
    setModalMessage(message);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => setIsModalOpen(false);

  const modal = (
    <Modal onClose={handleCloseModal}>
      <div className={styles.modalContent}>
        <div className={styles.modalContent__icon}>
          <FaExclamationCircle size='60px' />
        </div>

        <h3 className={styles.modalContent__text}>{modalMessage}</h3>
        <div className={styles.modalContent__buttons}>
          <button onClick={handleCloseModal}>Mkay...</button>
        </div>
      </div>
    </Modal>
  );

  return {
    modal,
    onOpenModal: handleOpenModal,
    isModalOpen,
  };
};

export default useInfoModal;
