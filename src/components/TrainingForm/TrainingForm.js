import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styles from '../../styles/TrainingForm/TrainingForm.module.scss';
import ExerciseForm from './ExerciseForm';
import { trainingFormActions } from '../../store/trainingForm-slice';
import checkFormValidity from '../../helpers/checkFormValidity';
import useConfirmModal from '../../hooks/useConfirmModal';
import checkValidityName from '../../helpers/checkValidityName';
import useInfoModal from '../../hooks/useInfoModal';

const TrainingForm = ({ exercisesCollection, onSubmitToFirebase }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  //all the data of the form is being constantly updated with the redux slice
  const { date, location, exercises, formError } = useSelector(
    state => state.trainingForm
  );

  //local state managing inputs
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedLocation, setSelectedLocation] = useState(location);

  //local state managing if input were 'touched'
  const [isDateTouched, setIsDateTouched] = useState(false);
  const [isLocationTouched, setIsLocationTouched] = useState(false);

  //variables which are being used for displaying error
  const isDateNOK =
    !checkValidityName(selectedDate) && isDateTouched && formError.isError;
  const isLocationNOK =
    !checkValidityName(selectedLocation) &&
    isLocationTouched &&
    formError.isError;

  //importing modals for clearing the form and showing validation error
  const {
    modal: clearModal,
    onOpenModal: openClearModal,
    isModalOpen: isClearModalOpen,
  } = useConfirmModal({
    question: 'Are you sure you want to clear the form?',
    onConfirmAction: handleClearForm,
  });

  const {
    modal: errorModal,
    onOpenModal: openErrorModal,
    isModalOpen: isErrorModalOpen,
  } = useInfoModal();

  //updating the context every time inputs are being changed
  useEffect(() => {
    dispatch(trainingFormActions.changeDate(selectedDate));
    dispatch(trainingFormActions.changeLocation(selectedLocation));
  }, [selectedDate, selectedLocation, dispatch]);

  //we take 'formError" from the context. once the 'formError'
  //changes to true, we deal with our inputs as if they were touched
  useEffect(() => {
    if (formError.isError) {
      setIsDateTouched(true);
      setIsLocationTouched(true);
    }
  }, [formError]);

  //reseting the error state if user changes anything in the form
  useEffect(() => {
    dispatch(
      trainingFormActions.handleFormError({ isError: false, message: '' })
    );
  }, [date, location, exercises, dispatch]);

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      uid: user.uid,
      date,
      location,
      exercises,
    };

    const formValidity = checkFormValidity(data);
    if (formValidity.isError) {
      dispatch(trainingFormActions.handleFormError(formValidity));
      openErrorModal(formValidity.message);
      return;
    }

    onSubmitToFirebase({ date, location, exercises });
  };

  //on button click we add new exercise form
  const handleAddExerciseForm = () => {
    dispatch(trainingFormActions.addBlankExerciseForm());
  };

  function handleClearForm() {
    dispatch(trainingFormActions.clearForm());
    setSelectedDate('');
    setSelectedLocation('');
  }

  //managing the classes depending on the isSometingNOK for the purpose of the styling
  const dateClasses = isDateNOK
    ? `${styles.form__generalInfo} ${styles.error}`
    : styles.form__generalInfo;

  const locationClasses = isLocationNOK
    ? `${styles.form__generalInfo} ${styles.error}`
    : styles.form__generalInfo;

  return (
    <>
      {isClearModalOpen && clearModal}
      {isErrorModalOpen && errorModal}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={dateClasses}>
          <div className={styles.form__generalInfo__date}>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              id='date'
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            />
          </div>
          <div className={locationClasses}>
            <label htmlFor='location'>Location (gym)</label>
            <input
              type='text'
              id='location'
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
            />
          </div>
        </div>

        {exercises.map((exercise, index) => (
          <ExerciseForm
            key={exercise.id}
            id={exercise.id}
            index={index}
            exercisesCollection={exercisesCollection}
          />
        ))}

        <div className={styles.form__btnContainer}>
          <button type='button' onClick={handleAddExerciseForm}>
            Add exercise
          </button>
          <button
            className={styles.form__btnContainer__submitBtn}
            type='submit'
          >
            Save
          </button>
          <button type='button' onClick={openClearModal}>
            Clear all
          </button>
        </div>
      </form>
    </>
  );
};

export default TrainingForm;
