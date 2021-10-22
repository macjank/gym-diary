import React from 'react';
import { useSelector } from 'react-redux';
import NewMuscleForm from '../components/Exercises/NewMuscleForm';
import styles from '../styles/pages/Exercises.module.scss';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Error from '../components/UI/Error';
import ExercisesList from '../components/Exercises/ExercisesList';

const Exercises = () => {
  const { isLoading, isError } = useSelector(state => state.exercisesBase);

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <Error />;

  return (
    <section className={styles.exercises}>
      <h2 className={styles.exercises__header}>All exercises</h2>
      <ExercisesList />
      <NewMuscleForm />
    </section>
  );

  // let content;

  // if (isLoading) {
  //   content = (
  //     <div className={styles.exercises__notification}>
  //       <LoadingSpinner />
  //     </div>
  //   );
  // } else if (isError) {
  //   content = (
  //     <div className={styles.exercises__notification}>
  //       <h2>Something went wrong...</h2>;
  //     </div>
  //   );
  // } else if (exercises.length === 0) {
  //   content = (
  //     <h2 className={styles.exercises__empty}>
  //       There are no muscle parts yet. Add your first one.
  //     </h2>
  //   );
  // } else {
  //   content = exercises.map((exercise, index) => {
  //     const { exercises, musclePart } = exercise;
  //     return (
  //       <MusclePart
  //         key={index}
  //         musclePart={musclePart}
  //         exercises={exercises || []}
  //       />
  //     );
  //   });
  // }

  // return (
  //   <section className={styles.exercises}>
  //     {content}
  //     <NewMuscleForm />
  //   </section>
  // );
};

export default Exercises;
