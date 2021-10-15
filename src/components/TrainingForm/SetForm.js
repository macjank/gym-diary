import React from 'react';
import { useContext, useEffect, useState } from 'react/cjs/react.development';
import TrainingFormContext from '../../store/trainingForm-context';
import styles from '../../styles/TrainingForm/SetForm.module.scss';

const SetForm = ({ parentId, id }) => {
  const { exercises, onChangeSetInfo, onRemoveSetForm, isSubmiting } =
    useContext(TrainingFormContext);

  const currentSet = exercises.find(exercise => exercise.id === parentId).sets[
    id
  ];

  const [selectedWeight, setSelectedWeight] = useState(currentSet.weight);
  const [selectedReps, setSelectedReps] = useState(currentSet.reps);

  const [isWeightTouched, setIsWeightTouched] = useState(false);
  const [isRepsTouched, setIsRepsTouched] = useState(false);

  const isWeightNOK =
    isWeightTouched && (!selectedWeight || selectedWeight <= 0);
  const isRepsNOK = isRepsTouched && (!selectedReps || selectedReps <= 0);

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

  useEffect(() => {
    if (isSubmiting) {
      setIsWeightTouched(true);
      setIsRepsTouched(true);
    }
  }, [isSubmiting]);

  const handleRemoveSet = () => {
    onRemoveSetForm({ parentId, id });
  };

  const weightClasses = isWeightNOK ? `${styles.error}` : '';

  const repsClasses = isRepsNOK ? `${styles.error}` : '';

  return (
    <div>
      <div className={weightClasses}>
        <label htmlFor='weight'>Weight</label>
        <input
          type='number'
          name='weight'
          value={selectedWeight ? selectedWeight : ''}
          onChange={e => setSelectedWeight(parseFloat(e.target.value))}
        />
      </div>
      <div className={repsClasses}>
        <label htmlFor='reps'>Repetitions</label>
        <input
          type='number'
          name='reps'
          value={selectedReps ? selectedReps : ''}
          onChange={e => setSelectedReps(parseFloat(e.target.value))}
        />
      </div>
      <button type='button' onClick={handleRemoveSet}>
        Remove set
      </button>
    </div>
  );
};

export default SetForm;