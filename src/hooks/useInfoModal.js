import { useState } from 'react';
import Modal from '../components/UI/Modal';
import styles from '../styles/UI/ConfirmModal.module.scss';

const useInfoModal = ({ info }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const modal = (
    <Modal onClose={handleCloseModal}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalContent__header}>{info}</h2>
        <div className={styles.modalContent__buttons}>
          <button onClick={handleCloseModal}>Got it!</button>
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
