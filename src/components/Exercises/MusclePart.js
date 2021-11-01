import React from 'react';
import NewExerciseForm from './NewExerciseForm';
import styles from '../../styles/Exercises/MusclePart.module.scss';
import { FaTrashAlt } from 'react-icons/fa';
import useConfirmModal from '../../hooks/useConfirmModal';
import useFirestore from '../../hooks/useFirestore';
import MuscleExercises from './MuscleExercises';

const MusclePart = ({ muscleId, exercisesCollection }) => {
  const { deleteDocument } = useFirestore('exercises');
  const currentMuscle = exercisesCollection.find(item => item.id === muscleId);
  const { muscleName, muscleExercises } = currentMuscle;

  const { modal, isModalOpen, onOpenModal } = useConfirmModal({
    question:
      'Are you sure you want to delete this muscle part and its exercises?',
    onConfirmAction: handleDeleteMuscle,
  });

  function handleDeleteMuscle() {
    deleteDocument(muscleId);
  }

  let content;

  if (muscleExercises.length === 0) {
    content = (
      <h3 className={styles.muscle__exercises__empty}>
        There are no exercises yet. Add your first one
      </h3>
    );
  } else {
    content = (
      <MuscleExercises
        exercisesCollection={exercisesCollection}
        muscleExercises={muscleExercises}
        muscleId={muscleId}
      />
    );
  }

  return (
    <>
      {isModalOpen && modal}
      <li className={styles.muscle}>
        <div className={styles.muscle__title}>
          <h2 className={styles.muscle__title__name}>{muscleName}</h2>
          <div className={styles.muscle__title__icon}>
            <FaTrashAlt size='35px' onClick={onOpenModal} />
          </div>
        </div>
        {/* <ul className={styles.muscle__exercises}>{content}</ul> */}
        {content}
        <NewExerciseForm
          exercisesCollection={exercisesCollection}
          muscleId={muscleId}
        />
      </li>
    </>
  );
};

export default MusclePart;
