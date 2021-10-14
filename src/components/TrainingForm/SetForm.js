import React from 'react';
import { useContext, useEffect, useState } from 'react/cjs/react.development';
import TrainingFormContext from '../../store/trainingForm-context';

const SetForm = ({ parentId, id }) => {
  const { exercises, onChangeSetInfo, onRemoveSetForm } =
    useContext(TrainingFormContext);

  const currentSet = exercises.find(exercise => exercise.id === parentId).sets[
    id
  ];

  const [selectedWeight, setSelectedWeight] = useState(currentSet.weight);
  const [selectedReps, setSelectedReps] = useState(currentSet.reps);

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

  const handleRemoveSet = () => {
    onRemoveSetForm({ parentId, id });
  };

  return (
    <div>
      <label htmlFor='weight'>Weight</label>
      <input
        type='number'
        name='weight'
        value={selectedWeight ? selectedWeight : ''}
        onChange={e => setSelectedWeight(parseFloat(e.target.value))}
        required
      />
      <label htmlFor='reps'>Repetitions</label>
      <input
        type='number'
        name='reps'
        value={selectedReps ? selectedReps : ''}
        onChange={e => setSelectedReps(parseFloat(e.target.value))}
        required
      />
      <button type='button' onClick={handleRemoveSet}>
        Remove set
      </button>
    </div>
  );
};

export default SetForm;
