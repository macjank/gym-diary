import React, { useContext } from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import TrainingFormContext from '../../store/trainingForm-context';
import styles from '../../styles/TrainingForm/TrainingForm.module.scss';
import ExerciseForm from './ExerciseForm';

const TrainingForm = () => {
  const {
    date,
    location,
    exercises,
    onChangeDate,
    onChangeLocation,
    onAddBlankExerciseForm,
    onClearForm,
  } = useContext(TrainingFormContext);

  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedLocation, setSelectedLocation] = useState(location);

  useEffect(() => {
    setSelectedDate(date);
    setSelectedLocation(location);
  }, [date, location]);

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleChangeDate = e => {
    const date = e.target.value;
    onChangeDate(date);
  };

  const handleChangeLocation = e => {
    const location = e.target.value;
    onChangeLocation(location);
  };

  const handleAddExerciseForm = () => {
    onAddBlankExerciseForm();
  };

  const exercisesContent = exercises.map(exercise => (
    <ExerciseForm key={exercise.id} id={exercise.id} />
  ));

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form__generalInfo}>
        <label htmlFor='date'>Date</label>
        <input
          type='date'
          id='date'
          value={selectedDate}
          onChange={handleChangeDate}
          required
        />
        <label htmlFor='location'>Location (gym)</label>
        <input
          type='text'
          id='location'
          value={selectedLocation}
          onChange={handleChangeLocation}
          required
        />
      </div>

      {exercisesContent}

      <button type='button' onClick={handleAddExerciseForm}>
        Add new exercise
      </button>
      <button type='button' onClick={onClearForm}>
        Clear All
      </button>
      <button type='submit'>Submit form</button>
    </form>
  );
};

export default TrainingForm;
