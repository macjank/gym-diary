import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import TrainingForm from '../components/TrainingForm/TrainingForm';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Error from '../components/UI/Error';
import useCollection from '../hooks/useCollection';
import { trainingFormActions } from '../store/trainingForm-slice';
import styles from '../styles/pages/NewTraining.module.scss';

const NewTraining = () => {
  const dispatch = useDispatch();
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

  // //id comes in only if the user makes any change in the form
  // useEffect(() => {
  //   //thanks to that id is being made only after user enter some data
  //   //and also we dont make another id after we manually clear the form
  //   if (date === '' && location === '' && exercises.length === 0) return;

  //   //we dont make new id if there is any
  //   if (id === '') {
  //     dispatch(trainingFormActions.setId());
  //   }
  // }, [date, location, exercises, dispatch, id]);

  //we mark form as "isStarted" when some of the inputs are changed
  useEffect(() => {
    if (date === '' && location === '' && exercises.length === 0) return;

    if (!isStarted) {
      dispatch(trainingFormActions.startForm());
    }
  }, [date, location, exercises]);

  if (error) return <Error />;
  if (!exercisesCollection) {
    return <LoadingSpinner />;
  }

  console.log(exercisesCollection);

  return (
    <main className={styles.newTraining}>
      <h2>Add new training</h2>
      <TrainingForm exercisesCollection={exercisesCollection} />
    </main>
  );
};

export default NewTraining;

//opcja 1:
// --- jeden formularz
// --- podczas edycji jeśli użytnik chce wyjść, dostaje prompta żeby albo discard albo save changes
// --- jak jesteśmy w trakcie wprowadzania nowego forma to nie można edytować starego treningu
// --- const isEditing w trainingFormie. ustawiamy na true jeśli id !== ''
