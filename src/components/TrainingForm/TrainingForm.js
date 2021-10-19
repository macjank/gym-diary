import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styles from '../../styles/TrainingForm/TrainingForm.module.scss';
import ExerciseForm from './ExerciseForm';
import { trainingFormActions } from '../../store/trainingForm-slice';
import checkFormValidity from '../../helpers/checkFormValidity';
import { useHistory } from 'react-router';
import { trainingsBaseActions } from '../../store/trainingsBase-slice';

const TrainingForm = () => {
  const history = useHistory();
  const { date, location, id, exercises, isValidationError } = useSelector(
    state => state.trainingForm
  );
  const dispatch = useDispatch();

  //seting the id of the new form once the component is rendered
  useEffect(() => {
    dispatch(trainingFormActions.setId());
  }, [dispatch]);

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
  }, [selectedDate, selectedLocation, dispatch]);

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
      id,
      exercises,
    };

    const isFormValid = checkFormValidity(data);
    if (!isFormValid) {
      dispatch(trainingFormActions.changeValidationError(true));
      return;
    }

    dispatch(trainingsBaseActions.addTraining(data));
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
  const exercisesContent = exercises.map((exercise, index) => (
    <ExerciseForm key={exercise.id} id={exercise.id} index={index} />
  ));

  //managing the classes depending on the isSometingNOK for the purpose of the styling
  const dateClasses = isDateNOK
    ? `${styles.form__generalInfo} ${styles.error}`
    : styles.form__generalInfo;

  const locationClasses = isLocationNOK
    ? `${styles.form__generalInfo} ${styles.error}`
    : styles.form__generalInfo;

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
          Add exercise
        </button>
        <button className={styles.form__btnContainer__submitBtn} type='submit'>
          Submit
        </button>
        <button type='button' onClick={handleClearForm}>
          Clear all
        </button>
      </div>
    </form>
  );
};

export default TrainingForm;
