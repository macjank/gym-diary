import { useState } from 'react';
import Modal from '../components/UI/Modal';
import styles from '../styles/UI/ConfirmModal.module.scss';

const useTwoActionsModal = ({
  question,
  onCancelAction,
  onConfirmAction,
  cancelBtnText,
  confirmBtnText,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCancel = () => {
    onCancelAction();
    handleCloseModal();
  };

  const handleConfirm = () => {
    onConfirmAction();
    handleCloseModal();
  };

  const modal = (
    <Modal onClose={handleCloseModal}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalContent__header}>{question}</h2>
        <div className={styles.modalContent__buttons}>
          <button onClick={handleCancel}>{cancelBtnText}</button>
          <button onClick={handleConfirm}>{confirmBtnText}</button>
        </div>
      </div>
    </Modal>
  );

  return {
    modal,
    openModal: handleOpenModal,
    isModalOpen,
  };
};

export default useTwoActionsModal;
