import React from 'react';
import { useSelector } from 'react-redux';
import MusclePart from '../components/Exercises/MusclePart';
import NewMuscleForm from '../components/Exercises/NewMuscleForm';
import styles from '../styles/pages/Exercises.module.scss';

const Exercises = () => {
  const { exercises } = useSelector(state => state.exercisesBase);

  return (
    <section className={styles.exercises}>
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

      <NewMuscleForm />
    </section>
  );
};

export default Exercises;
