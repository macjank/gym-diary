import React from 'react';
import NewExerciseForm from './NewExerciseForm';
import styles from '../../styles/Exercises/MusclePart.module.scss';
import Exercise from './Exercise';
import { useDispatch } from 'react-redux';
import { exercisesBaseActions } from '../../store/exercisesBase-slice';
import { FaTrashAlt } from 'react-icons/fa';
import useConfirmModal from '../../hooks/useConfirmModal';

const MusclePart = ({ musclePart, exercises }) => {
  const dispatch = useDispatch();

  const onDeleteQuestion = 'Are you sure you want to delete this muscle part?';

  const handleDeleteMuscle = () => {
    dispatch(exercisesBaseActions.removeMuscle(musclePart));
  };

  const { modal, isModalOpen, onOpenModal } = useConfirmModal({
    question: onDeleteQuestion,
    onConfirmAction: handleDeleteMuscle,
  });

  let content;

  if (exercises.length === 0) {
    content = (
      <h3 className={styles.muscle__exercises__empty}>
        There are no exercises yet. Add your first one
      </h3>
    );
  } else {
    content = exercises.map((exercise, index) => (
      <Exercise key={index} exercise={exercise} musclePart={musclePart} />
    ));
  }

  return (
    <>
      {isModalOpen && modal}
      <li className={styles.muscle}>
        <div className={styles.muscle__title}>
          <h2 className={styles.muscle__title__name}>{musclePart}</h2>
          <div className={styles.muscle__title__icon}>
            <FaTrashAlt size='35px' onClick={onOpenModal} />
          </div>
        </div>
        <ul className={styles.muscle__exercises}>{content}</ul>
        <NewExerciseForm musclePart={musclePart} />
      </li>
    </>
  );
};

export default MusclePart;
