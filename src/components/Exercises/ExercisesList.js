import React from 'react';
import { useSelector } from 'react-redux';
import MusclePart from '../Exercises/MusclePart';
import styles from '../../styles/Exercises/ExercisesList.module.scss';

const ExercisesList = () => {
  const { exercises } = useSelector(state => state.exercisesBase);

  if (exercises.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>The list is empty. Add some exercises</h2>
      </div>
    );
  }

  return (
    <ul>
      {exercises.map((exercise, index) => {
        const { exercises, musclePart } = exercise;
        return (
          <MusclePart
            key={index}
            musclePart={musclePart}
            exercises={exercises || []}
          />
        );
      })}
    </ul>
  );
};

export default ExercisesList;
