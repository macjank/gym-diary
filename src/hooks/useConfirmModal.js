import { useState } from 'react';
import Modal from '../components/UI/Modal';
import styles from '../styles/UI/ConfirmModal.module.scss';

const useConfirmModal = ({ question, onConfirmAction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleConfirm = () => {
    onConfirmAction();
    handleCloseModal();
  };

  const modal = (
    <Modal onClose={handleCloseModal}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalContent__header}>{question}</h2>
        <div className={styles.modalContent__buttons}>
          <button onClick={handleCloseModal}>Not so sure...</button>
          <button onClick={handleConfirm}>Yes</button>
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

export default useConfirmModal;
