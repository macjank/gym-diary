import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import useConfirmModal from '../../hooks/useConfirmModal';
import { exercisesBaseActions } from '../../store/exercisesBase-slice';
import styles from '../../styles/Exercises/Exercise.module.scss';

const Exercise = ({ exercise, musclePart }) => {
  const dispatch = useDispatch();

  const onDeleteQuestion = 'Are you sure you want to delete this exercise?';

  const handleDeleteExercise = () => {
    dispatch(exercisesBaseActions.removeExercise({ musclePart, exercise }));
  };

  const { modal, isModalOpen, onOpenModal } = useConfirmModal({
    question: onDeleteQuestion,
    onConfirmAction: handleDeleteExercise,
  });

  return (
    <>
      {isModalOpen && modal}
      <li className={styles.exercise}>
        <p className={styles.exercise__name}>{exercise}</p>
        <div className={styles.exercise__icon}>
          <FaTrashAlt size='30px' onClick={onOpenModal} />
        </div>
      </li>
    </>
  );
};

export default Exercise;
