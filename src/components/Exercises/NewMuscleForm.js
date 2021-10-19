import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { exercisesBaseActions } from '../../store/exercisesBase-slice';
import styles from '../../styles/Exercises/NewMuscleForm.module.scss';

const NewMuscleForm = () => {
  const dispatch = useDispatch();
  const newMuscleRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();

    const muscle = newMuscleRef.current.value;
    dispatch(exercisesBaseActions.addMuscleToBase(muscle));

    newMuscleRef.current.value = '';
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.form__title}>Add new muscle part</h3>
      <input
        type='text'
        id='muscle'
        name='muscle'
        ref={newMuscleRef}
        placeholder='Muscle part name'
        required
      />
      <button>Add</button>
    </form>
  );
};

export default NewMuscleForm;
