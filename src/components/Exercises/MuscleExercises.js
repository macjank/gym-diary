import React from 'react';
import Exercise from './Exercise';

const MuscleExercises = ({
  exercisesCollection,
  muscleExercises,
  muscleId,
}) => {
  return (
    <ul>
      {muscleExercises.map((exercise, index) => (
        <Exercise
          key={index}
          exercisesCollection={exercisesCollection}
          exerciseName={exercise}
          muscleId={muscleId}
        />
      ))}
    </ul>
  );
};

export default MuscleExercises;
