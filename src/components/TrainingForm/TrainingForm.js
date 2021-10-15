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
    onSubmitForm,
    isSubmiting,
  } = useContext(TrainingFormContext);

  //local state managing inputs
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedLocation, setSelectedLocation] = useState(location);

  //local state managing if input were 'touched'
  const [isDateTouched, setIsDateTouched] = useState(false);
  const [isLocationTouched, setIsLocationTouched] = useState(false);

  //variables which are being used for displaying error
  const isDateNOK = selectedDate === '' && isDateTouched;
  const isLocationNOK = selectedLocation === '' && isLocationTouched;

  //updating the context every time inputs are changed
  useEffect(() => {
    onChangeDate(selectedDate);
    onChangeLocation(selectedLocation);
  }, [selectedDate, selectedLocation]);

  //we take 'isSubmiting" from the context. once the 'isSubmiting'
  //changes to true, we deal with our inputs as if they were touched
  useEffect(() => {
    if (isSubmiting) {
      setIsDateTouched(true);
      setIsLocationTouched(true);
    }
  }, [isSubmiting]);

  //calling context
  const handleSubmit = e => {
    e.preventDefault();
    onSubmitForm();
  };

  //updating local state for inputs (date and location)
  const handleChangeDate = e => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  const handleChangeLocation = e => {
    const location = e.target.value;
    setSelectedLocation(location);
  };

  //adding new form on button click
  const handleAddExerciseForm = () => {
    onAddBlankExerciseForm();
  };

  //variable with array of components for exercise forms rendering
  const exercisesContent = exercises.map(exercise => (
    <ExerciseForm key={exercise.id} id={exercise.id} />
  ));

  //managing the classes depending on the isSometingNOK for the purpose of the styling
  const dateClasses = isDateNOK
    ? `${styles.form__generalInfo__date} ${styles.error}`
    : styles.form__generalInfo__date;

  const locationClasses = isLocationNOK
    ? `${styles.form__generalInfo__location} ${styles.error}`
    : styles.form__generalInfo__location;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={dateClasses}>
        <div className={styles.form__generalInfo__date}>
          <label htmlFor='date'>Date</label>
          <input
            type='date'
            id='date'
            value={selectedDate}
            onChange={handleChangeDate}
          />
        </div>
        <div className={locationClasses}>
          <label htmlFor='location'>Location (gym)</label>
          <input
            type='text'
            id='location'
            value={selectedLocation}
            onChange={handleChangeLocation}
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
