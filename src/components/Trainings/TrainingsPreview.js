import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import SingleTrainingPreview from './SingleTrainingPreview';

const TrainingsPreview = () => {
  const { trainings } = useSelector(state => state.trainingsBase);

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
