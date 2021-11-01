import React, { useRef, useState } from 'react';
import checkValidityName from '../../helpers/checkValidityName';
import useFirestore from '../../hooks/useFirestore';
import styles from '../../styles/Exercises/NewExerciseForm.module.scss';

const NewExerciseForm = ({ exercisesCollection, muscleId }) => {
  const { overwriteDocument } = useFirestore('exercises');
  const currentMuscle = exercisesCollection.find(item => item.id === muscleId);

  const [error, setError] = useState({
    value: false,
    message: '',
  });

  const newExerciseRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();

    const newExercise = newExerciseRef.current.value.trim().toLowerCase();
    const isNewExerciseNameValid = checkValidityName(newExercise);
    const doesNewExerciseNameExist = currentMuscle.muscleExercises.some(
      exercise => exercise === newExercise
    );

    if (!isNewExerciseNameValid) {
      setError({
        value: true,
        message: 'Please enter something',
      });
      return;
    }

    if (doesNewExerciseNameExist) {
      setError({
        value: true,
        message: 'That value already exists',
      });
      return;
    }

    const newMuscleData = {
      createdAt: currentMuscle.createdAt,
      muscleName: currentMuscle.muscleName,
      muscleExercises: [...currentMuscle.muscleExercises, newExercise],
      uid: currentMuscle.uid,
    };

    overwriteDocument(muscleId, newMuscleData);

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
