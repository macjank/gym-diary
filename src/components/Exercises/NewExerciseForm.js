import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { exercisesBaseActions } from '../../store/exercisesBase-slice';
import styles from '../../styles/Exercises/NewExerciseForm.module.scss';

const NewExerciseForm = ({ musclePart }) => {
  const dispatch = useDispatch();
  const newExerciseRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const exercise = newExerciseRef.current.value;
    console.log(exercise);

    dispatch(exercisesBaseActions.addExerciseToBase({ musclePart, exercise }));

    newExerciseRef.current.value = '';
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type='text'
        id='exercise'
        name='exercise'
        ref={newExerciseRef}
        placeholder='Exercise name'
        required
      />
      <button>Add new exercise</button>
    </form>
  );
};

export default NewExerciseForm;
