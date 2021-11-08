import { useCallback, useState } from 'react';
import Modal from '../components/UI/Modal';
import styles from '../styles/UI/Modal.module.scss';
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
      <div className={styles.modal__content}>
        <div className={styles.modal__content__icon}>
          <FaExclamationCircle size='60px' />
        </div>

        <h2 className={styles.modal__content__header}>{modalMessage}</h2>
        <div className={styles.modal__content__buttons}>
          <button
            className={styles.modal__content__buttons__confirmBtn}
            onClick={handleCloseModal}
          >
            Mkay...
          </button>
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
