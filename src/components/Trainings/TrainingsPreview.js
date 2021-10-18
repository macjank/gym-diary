import React from 'react';
import { useSelector } from 'react-redux';
import SingleTrainingPreview from './SingleTrainingPreview';
import styles from '../../styles/Trainings/TrainingsPreview.module.scss';
import LoadingSpinner from '../UI/LoadingSpinner';

const TrainingsPreview = () => {
  const { trainings, isLoading } = useSelector(state => state.trainingsBase);

  if (isLoading) {
    return (
      <main className={styles.loadingContainer}>
        <LoadingSpinner />
      </main>
    );
  }

  if (trainings.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>The list is empty. Add some trainings</h2>
      </div>
    );
  }

  return (
    <ul>
      {trainings.map(training => {
        const { id, date, location } = training;
        return (
          <SingleTrainingPreview
            key={id}
            id={id}
            date={date}
            location={location}
          />
        );
      })}
    </ul>
  );
};

export default TrainingsPreview;
