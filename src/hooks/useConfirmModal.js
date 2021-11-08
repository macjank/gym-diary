import { useState } from 'react';
import Modal from '../components/UI/Modal';
import styles from '../styles/UI/Modal.module.scss';
import { FaQuestionCircle } from 'react-icons/fa';

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
      <div className={styles.modal__content}>
        <div className={styles.modal__content__icon}>
          <FaQuestionCircle size='50px' />
        </div>
        <h2 className={styles.modal__content__header}>{question}</h2>
        <div className={styles.modal__content__buttons}>
          <button
            className={styles.modal__content__buttons__cancelBtn}
            onClick={handleCloseModal}
          >
            Not so sure...
          </button>
          <button
            onClick={handleConfirm}
            className={styles.modal__content__buttons__confirmBtn}
          >
            Yes
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

export default useConfirmModal;
