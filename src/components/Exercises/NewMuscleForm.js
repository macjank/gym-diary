import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import checkValidityName from '../../helpers/checkValidityName';
import { exercisesBaseActions } from '../../store/exercisesBase-slice';
import styles from '../../styles/Exercises/NewMuscleForm.module.scss';

const NewMuscleForm = () => {
  const dispatch = useDispatch();
  const newMuscleRef = useRef();
  const { exercises } = useSelector(state => state.exercisesBase);

  const [error, setError] = useState({
    value: false,
    message: '',
  });

  const handleSubmit = e => {
    e.preventDefault();

    const muscleName = newMuscleRef.current.value.trim().toLowerCase();
    const isMuscleNameValid = checkValidityName(muscleName);
    const doesMuscleNameExist = exercises.some(
      exercise => exercise.musclePart === muscleName
    );

    if (!isMuscleNameValid) {
      setError({
        value: true,
        message: 'Please enter something',
      });
      return;
    }

    if (doesMuscleNameExist) {
      setError({
        value: true,
        message: 'That value already exists',
      });
      return;
    }

    dispatch(exercisesBaseActions.addMuscleToBase(muscleName));

    newMuscleRef.current.value = '';
    setError({
      value: false,
      message: '',
    });
  };

  const inputClasses = error.value ? styles.form__error : '';

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.form__title}>Add new muscle part</h3>
        {error.value && <h3 className={styles.form__info}>{error.message}</h3>}
        <input
          className={inputClasses}
          type='text'
          id='muscle'
          name='muscle'
          ref={newMuscleRef}
          placeholder='Muscle part name'
        />
        <button>Add</button>
      </form>
    </>
  );
};

export default NewMuscleForm;
