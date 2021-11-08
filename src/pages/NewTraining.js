import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import TrainingForm from '../components/TrainingForm/TrainingForm';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Error from '../components/UI/Error';
import useCollection from '../hooks/useCollection';
import { trainingFormActions } from '../store/trainingForm-slice';
import styles from '../styles/pages/NewTraining.module.scss';
import useFirestore from '../hooks/useFirestore';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

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

  //clear the form and redirect if the form was submitted
  useEffect(() => {
    if (response.success) {
      dispatch(trainingFormActions.clearForm());
      history.push('/');
      localStorage.removeItem('trainingForm');
    }
  }, [response.success, dispatch, history]);

  //we mark form as "isStarted" when some of the inputs are changed
  useEffect(() => {
    if (date === '' && location === '' && exercises.length === 0) return;

    if (!isStarted) {
      dispatch(trainingFormActions.startForm());
    }
  }, [date, location, exercises, dispatch, isStarted]);

  if (error) return <Error />;
  if (!exercisesCollection) {
    return <LoadingSpinner />;
  }

  const areThereAnyExercises = exercisesCollection.length !== 0;

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

  if (!areThereAnyExercises) {
    content = (
      <div className={styles.empty}>
        <h2 className={styles.empty__header}>
          Your exercises collection is empty <br /> You have to manage it before
          you add a new training
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

  return <main className={styles.newTraining}>{content}</main>;
};

export default NewTraining;
