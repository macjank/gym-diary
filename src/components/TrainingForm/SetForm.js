import React from 'react';
import { useContext, useEffect, useState } from 'react/cjs/react.development';
import TrainingFormContext from '../../store/trainingForm-context';

const SetForm = ({ parentId, id }) => {
  const { onChangeSetInfo } = useContext(TrainingFormContext);

  const [selectedWeight, setSelectedWeight] = useState(null);
  const [selectedReps, setSelectedReps] = useState(null);

  useEffect(() => {
    if (!selectedWeight || !selectedReps) {
      return;
    }
    const data = {
      parentId,
      id,
      weight: selectedWeight,
      reps: selectedReps,
    };
    onChangeSetInfo(data);
  }, [selectedWeight, selectedReps]);

  return (
    <div>
      <label htmlFor='weight'>Weight</label>
      <input
        type='number'
        name='weight'
        onChange={e => setSelectedWeight(parseFloat(e.target.value))}
        required
      />
      <label htmlFor='reps'>Repetitions</label>
      <input
        type='number'
        name='reps'
        onChange={e => setSelectedReps(parseFloat(e.target.value))}
        required
      />
    </div>
  );
};

export default SetForm;
