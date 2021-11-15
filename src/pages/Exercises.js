import React from 'react';
import { useSelector } from 'react-redux';
import NewMuscleForm from '../components/Exercises/NewMuscleForm';
import styles from '../styles/pages/Exercises.module.scss';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Error from '../components/UI/Error';
import ExercisesCollection from '../components/Exercises/ExercisesCollection';
import useCollection from '../hooks/useCollection';

const Exercises = () => {
  const { user } = useSelector(state => state.auth);

  //getting the exercises base from firebase
  const { data: exercisesCollection, error } = useCollection(
    'exercises',
    ['uid', '==', user.uid],
    ['createdAt', 'asc']
  );

  //console.log(exercisesCollection);

  if (error) return <Error />;
  if (!exercisesCollection) return <LoadingSpinner />;

  return (
    <main className={styles.exercises}>
      <h1 className={styles.exercises__header}>All exercises</h1>
      <ExercisesCollection exercisesCollection={exercisesCollection} />
      <NewMuscleForm exercisesCollection={exercisesCollection} />
    </main>
  );
};

export default Exercises;
