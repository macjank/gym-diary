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
  const { data: exercisesCollection, error } = useCollection('exercises', [
    'uid',
    '==',
    user.uid,
  ]);

  if (error) return <Error />;
  if (!exercisesCollection) return <LoadingSpinner />;

  let content;

  if (exercisesCollection.length === 0) {
    content = (
      <div className={styles.empty}>
        <h2>The list is empty. Add some exercises</h2>
      </div>
    );
  } else {
    content = <ExercisesCollection exercisesCollection={exercisesCollection} />;
  }

  return (
    <section className={styles.exercises}>
      <h2 className={styles.exercises__header}>All exercises</h2>
      {content}
      <NewMuscleForm exercisesCollection={exercisesCollection} />
    </section>
  );
};

export default Exercises;
