import React, { useContext } from 'react';
import TrainingsContext from '../../store/trainings-context';
import SingleTrainingPreview from './SingleTrainingPreview';

const TrainingsPreview = () => {
  const { trainings } = useContext(TrainingsContext);

  return (
    <div>
      {trainings.map(training => {
        const { date, location } = training;
        return <SingleTrainingPreview date={date} location={location} />;
      })}
    </div>
  );
};

export default TrainingsPreview;
