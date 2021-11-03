import React from 'react';
import Exercise from './Exercise';
import styles from '../../styles/Exercises/MuscleExercises.module.scss';

const MuscleExercises = ({
  exercisesCollection,
  muscleExercises,
  muscleId,
}) => {
  return (
    <ul className={styles.muscles}>
      {muscleExercises.map((exercise, index) => (
        <Exercise
          key={index}
          exercisesCollection={exercisesCollection}
          exerciseName={exercise}
          muscleId={muscleId}
        />
      ))}
    </ul>
  );
};

export default MuscleExercises;
