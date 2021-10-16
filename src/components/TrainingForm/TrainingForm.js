import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react/cjs/react.development';
import styles from '../../styles/TrainingForm/TrainingForm.module.scss';
import ExerciseForm from './ExerciseForm';
import { trainingFormActions } from '../../store/trainingForm-slice';
import { sendNewTraining } from '../../store/trainingForm-actions';
import checkFormValidity from '../../helpers/checkFormValidity';
import { useHistory } from 'react-router';

const TrainingForm = () => {
  const history = useHistory();
  const { date, location, exercises, isValidationError } = useSelector(
    state => state.trainingForm
  );
  const dispatch = useDispatch();

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
    dispatch(trainingFormActions.changeDate(selectedDate));
    dispatch(trainingFormActions.changeLocation(selectedLocation));
  }, [selectedDate, selectedLocation]);

  //we take 'hasValidationFailed" from the context. once the 'hasValidationFailed'
  //changes to true, we deal with our inputs as if they were touched
  useEffect(() => {
    if (isValidationError) {
      setIsDateTouched(true);
      setIsLocationTouched(true);
    }
  }, [isValidationError]);

  //calling context
  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      date,
      location,
      exercises,
    };

    const isFormValid = checkFormValidity(data);
    if (!isFormValid) {
      dispatch(trainingFormActions.changeValidationError(true));
      return;
    }

    dispatch(sendNewTraining(data));
    history.push('/');
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
    dispatch(trainingFormActions.addBlankExerciseForm());
  };

  const handleClearForm = () => {
    dispatch(trainingFormActions.clearForm());
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
        <button type='button' onClick={handleClearForm}>
          Clear All
        </button>
        <button type='submit'>Submit form</button>
      </div>
    </form>
  );
};

export default TrainingForm;
