import React, { useContext } from 'react';
import TrainingsContext from '../../store/trainings-context';
import SingleTrainingPreview from './SingleTrainingPreview';

const TrainingsPreview = () => {
  const { trainings } = useContext(TrainingsContext);

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
