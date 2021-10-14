import React, { useContext } from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import TrainingFormContext from '../../store/trainingForm-context';
import styles from '../../styles/TrainingForm/TrainingForm.module.scss';
import ExerciseForm from './ExerciseForm';
import { Formik, Field, Form } from 'formik';

const TrainingForm = () => {
  const {
    date,
    location,
    exercises,
    onChangeDate,
    onChangeLocation,
    onAddBlankExerciseForm,
    onClearForm,
    onSubmitForm,
  } = useContext(TrainingFormContext);

  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedLocation, setSelectedLocation] = useState(location);

  //const [isDateNOK, setIsDateNOK] = useState(false);
  //const [isLocationNOK, setIsLocationNOK] = useState(false);

  useEffect(() => {
    onChangeDate(selectedDate);
    onChangeLocation(selectedLocation);
  }, [selectedDate, selectedLocation]);

  const handleSubmit = e => {
    e.preventDefault();

    console.log('submit');
    //onSubmitForm();
  };

  const handleChangeDate = e => {
    const date = e.target.value;
    setSelectedDate(date);
    //onChangeDate(date);
  };

  const handleChangeLocation = e => {
    const location = e.target.value;
    setSelectedLocation(location);
    //onChangeLocation(location);
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
        <div className={styles.form__generalInfo__date}>
          <label htmlFor='date'>Date</label>
          <input
            type='date'
            id='date'
            value={selectedDate}
            onChange={handleChangeDate}
            required
          />
        </div>
        <div className={styles.form__generalInfo__location}>
          <label htmlFor='location'>Location (gym)</label>
          <input
            type='text'
            id='location'
            value={selectedLocation}
            onChange={handleChangeLocation}
            required
          />
        </div>
      </div>

      {exercisesContent}

      <div className={styles.form__btnContainer}>
        <button type='button' onClick={handleAddExerciseForm}>
          Add new exercise
        </button>
        <button type='button' onClick={onClearForm}>
          Clear All
        </button>
        <button type='submit'>Submit form</button>
      </div>
    </form>
  );
};

export default TrainingForm;
