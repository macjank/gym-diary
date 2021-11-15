import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import TrainingForm from '../components/TrainingForm/TrainingForm';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useCollection from '../hooks/useCollection';
import { trainingFormActions } from '../store/trainingForm-slice';
import styles from '../styles/pages/NewTraining.module.scss';
import useFirestore from '../hooks/useFirestore';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import useInfoModal from '../hooks/useInfoModal';

const NewTraining = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { date, location, isStarted, exercises } = useSelector(
    state => state.trainingForm
  );
  const { user } = useSelector(state => state.auth);

  //getting the exercises base from firebase
  const { data: exercisesCollection, error } = useCollection('exercises', [
    'uid',
    '==',
    user.uid,
  ]);

  const { addDocument, response } = useFirestore('trainings');

  const {
    modal: errorModal,
    onOpenModal: openErrorModal,
    isModalOpen: isErrorModalOpen,
  } = useInfoModal();

  //saving the data in the local storage
  useEffect(() => {
    const trainingData = {
      date,
      location,
      exercises,
      isStarted,
    };

    localStorage.setItem('trainingForm', JSON.stringify(trainingData));
  }, [date, location, exercises, isStarted]);

  //clear the form, clear the local storage
  // and redirect if the form was submitted succesfully
  useEffect(() => {
    if (response.success) {
      dispatch(trainingFormActions.clearForm());
      history.push('/');
      localStorage.removeItem('trainingForm');
    }
  }, [response.success, dispatch, history]);

  //we mark form as "isStarted" when some of the inputs are changed
  useEffect(() => {
    //thanks to below line we avoid changing "isStarted" at the first render
    if (date === '' && location === '' && exercises.length === 0) return;

    if (!isStarted) {
      dispatch(trainingFormActions.startForm());
    }
  }, [date, location, exercises, dispatch, isStarted]);

  //showing the info modal when sending data to firebase has failed
  useEffect(() => {
    if (response.error) {
      const errorInfo = response.error.message
        ? response.error.message
        : 'Sending data has failed';
      openErrorModal(errorInfo);
    }
  }, [dispatch, response.error, openErrorModal]);

  useEffect(() => {
    if (error) {
      openErrorModal(error);
    }
  }, [error, openErrorModal]);

  if (!exercisesCollection || response.isPending) {
    return <LoadingSpinner />;
  }

  const handleSubmitToFirebase = ({ date, location, exercises }) => {
    const doc = {
      uid: user.uid,
      date,
      location,
      exercises,
    };

    addDocument(doc);
  };

  let content;

  const areThereAnyExercises =
    exercisesCollection.length !== 0 &&
    !exercisesCollection.every(
      exercise => exercise.muscleExercises.length === 0
    );

  //if user doesn't have any exercises in the base we force him to add them first
  if (!areThereAnyExercises) {
    content = (
      <div className={styles.empty}>
        <h2 className={styles.empty__header}>
          Your exercises collection is empty or incomplete. <br /> You won't be
          able to add training without it, so
          <span> please complete it first.</span>
        </h2>
        <Link to='exercises'>
          <button className={styles.empty__exercisesBtn}>Add exercises</button>
        </Link>
      </div>
    );
  } else {
    content = (
      <>
        <h1 className={styles.newTraining__header}>Add new training</h1>
        <TrainingForm
          exercisesCollection={exercisesCollection}
          onSubmitToFirebase={handleSubmitToFirebase}
        />
      </>
    );
  }

  return (
    <>
      {isErrorModalOpen && errorModal}
      <main className={styles.newTraining}>{content}</main>
    </>
  );
};

export default NewTraining;
