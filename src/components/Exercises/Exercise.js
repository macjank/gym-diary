import React from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from '../../styles/Exercises/Exercise.module.scss';

const Exercise = ({ exercise, musclePart, onDeleteExercise }) => {
  const handleDeleteExercise = () => {
    onDeleteExercise(musclePart, exercise);
  };

  return (
    <div className={styles.exercise}>
      <p className={styles.exercise__name}>{exercise}</p>
      <div
        className={styles.exercise__icon}
        onClick={handleDeleteExercise}
      >
        <FaTimes size='30px' />
      </div>
    </div>
  );
};

export default Exercise;
