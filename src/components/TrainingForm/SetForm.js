import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { trainingFormActions } from '../../store/trainingForm-slice';
import styles from '../../styles/TrainingForm/SetForm.module.scss';
import { FaTimes } from 'react-icons/fa';

const SetForm = ({ parentId, id }) => {
  const { exercises, isValidationError } = useSelector(
    state => state.trainingForm
  );
  const dispatch = useDispatch();

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
    //onChangeSetInfo(data);
    dispatch(trainingFormActions.editSet(data));
  }, [selectedWeight, selectedReps, dispatch, parentId, id]);

  useEffect(() => {
    if (isValidationError) {
      setIsWeightTouched(true);
      setIsRepsTouched(true);
    }
  }, [isValidationError]);

  const handleRemoveSet = () => {
    //onRemoveSetForm({ parentId, id });
    dispatch(trainingFormActions.removeSet({ parentId, id }));
  };

  const weightClasses = isWeightNOK ? `${styles.error}` : '';

  const repsClasses = isRepsNOK ? `${styles.error}` : '';

  return (
    <div className={styles.setForm}>
      <div className={styles.setForm__title}>
        <h3>Set {id + 1}</h3>
        <FaTimes size='30px' onClick={handleRemoveSet} />
      </div>
      <div className={styles.setForm__inputs}>
        <div className={weightClasses}>
          <label htmlFor='weight'>Weight (kg)</label>
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
      </div>
    </div>
  );
};

export default SetForm;
