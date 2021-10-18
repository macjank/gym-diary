import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styles from '../../styles/Trainings/TrainingDetails.module.scss';
import LoadingSpinner from '../UI/LoadingSpinner';
import ExerciseDetails from './ExerciseDetails';

const TrainingDetails = () => {
  const { trainingId } = useParams();
  const { trainings, isLoading } = useSelector(state => state.trainingsBase);

  if (isLoading) {
    return (
      <main className={styles.loadingContainer}>
        <LoadingSpinner />
      </main>
    );
  }

  if (trainings.every(training => training.id !== trainingId)) {
    return (
      <main className={styles.notFound}>
        <h2>Training not found</h2>
        <Link to='/'>
          <button>Go home</button>
        </Link>
      </main>
    );
  }

  const { location, date, exercises } = trainings.find(
    training => training.id === trainingId
  );

  const exercisesDetails = exercises.map(exercise => {
    const { exerciseName, musclePart, sets, id } = exercise;
    return (
      <ExerciseDetails
        key={id}
        id={id}
        exerciseName={exerciseName}
        musclePart={musclePart}
        sets={sets}
      />
    );
  });

  return (
    <main className={styles.training}>
      <h2 className={styles.training__title}>Training details</h2>
      <div className={styles.training__overalInfo}>
        <h3>
          Date: <span>{date}</span>
        </h3>
        <h3>
          Location: <span>{location}</span>
        </h3>
      </div>
      <div className={styles.training__details}>
        <h3 className={styles.training__details__title}>Exercises:</h3>
        <ul className={styles.training__details__exercises}>
          {exercisesDetails}
        </ul>
      </div>
    </main>
  );
};

export default TrainingDetails;
