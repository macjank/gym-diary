import React from 'react';
import NewExerciseForm from './NewExerciseForm';
import styles from '../../styles/Exercises/MusclePart.module.scss';
import Exercise from './Exercise';
import { useDispatch } from 'react-redux';
import { exercisesBaseActions } from '../../store/exercisesBase-slice';
import { FaTimes } from 'react-icons/fa';

const MusclePart = ({ musclePart, exercises }) => {
  const dispatch = useDispatch();

  const handleDeleteMuscle = () => {
    dispatch(exercisesBaseActions.removeMuscle(musclePart));
  };

  const handleDeleteExercise = (musclePart, exercise) => {
    dispatch(exercisesBaseActions.removeExercise({ musclePart, exercise }));
  };

  return (
    <div className={styles.muscle}>
      <div className={styles.muscle__title}>
        <h2 className={styles.muscle__title__name}>{musclePart}</h2>
        <FaTimes size='30px' onClick={handleDeleteMuscle} />
      </div>
      <div className={styles.muscle__exercises}>
        {exercises.map((exercise, index) => (
          <Exercise
            key={index}
            exercise={exercise}
            musclePart={musclePart}
            onDeleteExercise={handleDeleteExercise}
          />
        ))}
      </div>
      <NewExerciseForm musclePart={musclePart} />
    </div>
  );
};

export default MusclePart;
