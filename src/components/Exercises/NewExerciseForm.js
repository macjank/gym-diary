import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import checkValidityName from '../../helpers/checkValidityName';
import { exercisesBaseActions } from '../../store/exercisesBase-slice';
import styles from '../../styles/Exercises/NewExerciseForm.module.scss';

const NewExerciseForm = ({ musclePart }) => {
  const dispatch = useDispatch();
  const newExerciseRef = useRef();
  const { exercises } = useSelector(state => state.exercisesBase);
  const exerciseNames =
    exercises.find(exercise => exercise.musclePart === musclePart).exercises ||
    [];

  const [error, setError] = useState({
    value: false,
    message: '',
  });

  const handleSubmit = e => {
    e.preventDefault();

    const exerciseName = newExerciseRef.current.value.trim().toLowerCase();
    const isExerciseNameValid = checkValidityName(exerciseName);
    const doesExerciseNameExist = exerciseNames.some(
      exercise => exercise === exerciseName
    );

    if (!isExerciseNameValid) {
      setError({
        value: true,
        message: 'Please enter something',
      });
      return;
    }

    if (doesExerciseNameExist) {
      setError({
        value: true,
        message: 'That value already exists',
      });
      return;
    }
  
    dispatch(
      exercisesBaseActions.addExerciseToBase({ musclePart, exerciseName })
    );

    newExerciseRef.current.value = '';
    setError({
      value: false,
      message: '',
    });
  };

  const inputClasses = error.value ? styles.form__error : '';

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error.value && <h3 className={styles.form__info}>{error.message}</h3>}
      <input
        className={inputClasses}
        type='text'
        id='exercise'
        name='exercise'
        ref={newExerciseRef}
        placeholder='Exercise name'
      />
      <button>Add new exercise</button>
    </form>
  );
};

export default NewExerciseForm;
