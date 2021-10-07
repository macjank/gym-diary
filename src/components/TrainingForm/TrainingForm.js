import React from 'react';
import { useState } from 'react/cjs/react.development';
import styles from '../../styles/TrainingForm/TrainingForm.module.scss';
import ExerciseForm from './ExerciseForm';

const TrainingForm = () => {
  const [exerciseForms, setExerciseForms] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('submit');
  };

  const handleAddExerciseForm = () => {
    const timestamp = Date.now();

    const newExerciseForm = <ExerciseForm key={timestamp} />;
    setExerciseForms(prevExercises => [...prevExercises, newExerciseForm]);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form__generalInfo}>
        <label htmlFor='date'>Date</label>
        <input type='date' id='date' required />
        <label htmlFor='location'>Location (gym)</label>
        <input type='text' id='location' required />
      </div>

      {exerciseForms}

      <button type='button' onClick={handleAddExerciseForm}>
        Add new exercise
      </button>
    </form>
  );
};

export default TrainingForm;
