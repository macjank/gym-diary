import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import useConfirmModal from '../../hooks/useConfirmModal';
import useFirestore from '../../hooks/useFirestore';
import styles from '../../styles/Exercises/Exercise.module.scss';

const Exercise = ({ exercisesCollection, exerciseName, muscleId }) => {
  const { overwriteDocument } = useFirestore('exercises');
  const currentMuscle = exercisesCollection.find(item => item.id === muscleId);

  const { modal, isModalOpen, onOpenModal } = useConfirmModal({
    question: 'Are you sure you want to delete this exercise?',
    onConfirmAction: handleDeleteExercise,
  });

  function handleDeleteExercise() {
    const newExercises = currentMuscle.muscleExercises.filter(
      item => item !== exerciseName
    );

    const newMuscleData = {
      //...currentMuscle,
      muscleName: currentMuscle.muscleName,
      uid: currentMuscle.uid,
      muscleExercises: newExercises,
    };

    overwriteDocument(muscleId, newMuscleData);
  }

  return (
    <>
      {isModalOpen && modal}
      <li className={styles.exercise}>
        <p className={styles.exercise__name}>{exerciseName}</p>
        <div className={styles.exercise__icon}>
          <FaTrashAlt size='30px' onClick={onOpenModal} />
        </div>
      </li>
    </>
  );
};

export default Exercise;
