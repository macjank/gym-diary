import React from 'react';
import SingleTrainingPreview from './SingleTrainingPreview';
//import styles from '../../styles/Trainings/TrainingsList.module.scss';

const TrainingsList = ({ trainings }) => {
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

export default TrainingsList;
