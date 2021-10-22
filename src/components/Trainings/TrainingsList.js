import React from 'react';
import { useSelector } from 'react-redux';
import SingleTrainingPreview from './SingleTrainingPreview';
import styles from '../../styles/Trainings/TrainingsList.module.scss';

const TrainingsList = ({ numOfTrainings }) => {
  const { trainings } = useSelector(state => state.trainingsBase);

  if (trainings.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>The list is empty. Add some trainings</h2>
      </div>
    );
  }

  const trainingsToShow = trainings.slice(numOfTrainings);

  return (
    <ul>
      {trainingsToShow.map(training => {
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

export default TrainingsList;
