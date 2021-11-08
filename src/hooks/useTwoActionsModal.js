import { useState } from 'react';
import Modal from '../components/UI/Modal';
import styles from '../styles/UI/Modal.module.scss';
import { FaQuestionCircle } from 'react-icons/fa';

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
      <div className={styles.modal__content}>
        <div className={styles.modal__content__icon}>
          <FaQuestionCircle size='50px' />
        </div>
        <h2 className={styles.modal__content__header}>{question}</h2>
        <div className={styles.modal__content__buttons}>
          <button
            onClick={handleCancel}
            className={styles.modal__content__buttons__cancelBtn}
          >
            {cancelBtnText}
          </button>
          <button
            onClick={handleConfirm}
            className={styles.modal__content__buttons__confirmBtn}
          >
            {confirmBtnText}
          </button>
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
