import React from 'react';
import MusclePart from './MusclePart';

const ExercisesCollection = ({ exercisesCollection }) => {
  return (
    <ul>
      {exercisesCollection.map(item => {
        const { id } = item;
        return (
          <MusclePart
            key={id}
            muscleId={id}
            exercisesCollection={exercisesCollection}
          />
        );
      })}
    </ul>
  );
};

export default ExercisesCollection;
