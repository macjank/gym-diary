import React from 'react';
import { useSelector } from 'react-redux';
import TrainingsList from '../components/Trainings/TrainingsList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Error from '../components/UI/Error';
import styles from '../styles/pages/Trainings.module.scss';

const Trainings = () => {
  const { isLoading, isError } = useSelector(state => state.trainingsBase);

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <Error />;

  return (
    <main className={styles.trainings}>
      <h2 className={styles.trainings__header}>All trainings</h2>
      <TrainingsList />
    </main>
  );
};

export default Trainings;
