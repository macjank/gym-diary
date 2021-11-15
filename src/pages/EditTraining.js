import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Prompt, useHistory, useParams } from 'react-router';
import TrainingForm from '../components/TrainingForm/TrainingForm';
import useCollection from '../hooks/useCollection';
import { trainingFormActions } from '../store/trainingForm-slice';
import Error from '../components/UI/Error';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useFirestore from '../hooks/useFirestore';

import styles from '../styles/pages/EditTraining.module.scss';

const EditTraining = () => {
  const { trainingId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { isEditingExistingTraining } = useSelector(
    state => state.trainingForm
  );
  const { user } = useSelector(state => state.auth);

  //we need this variable, bc after a succesful saving the form we need to redirect the user
  const [showPrompt, setShowPrompt] = useState(true);

  const { data: exercisesCollection, error } = useCollection('exercises', [
    'uid',
    '==',
    user.uid,
  ]);
  const { overwriteDocument } = useFirestore('trainings');

  //we checked if user entered this adress by clicking edit icon - only then
  //property 'isEditing' === true
  //if it's not true, it means the adress was entered manually and the user is
  //redirected to the training page
  useEffect(() => {
    if (!isEditingExistingTraining) {
      history.replace(`/trainings/${trainingId}`);
    }
  }, [isEditingExistingTraining, trainingId, history]);

  //we clean the form after component gets unmounted
  //we force user to save changes before that by returning <Prompt /> with always when=true
  useEffect(() => {
    return () => dispatch(trainingFormActions.clearForm());
  }, [dispatch]);

  if (error) return <Error />;
  if (!exercisesCollection) {
    return <LoadingSpinner />;
  }

  const handleSubmitToFirebase = ({ date, location, exercises }) => {
    const newDoc = {
      uid: user.uid,
      date,
      location,
      exercises,
    };

    overwriteDocument(trainingId, newDoc);
    setShowPrompt(false);
    setTimeout(() => {
      dispatch(trainingFormActions.clearForm());
      history.replace('/');
    }, 2000);
  };

  return (
    <>
      <Prompt
        when={showPrompt}
        message={() =>
          'Are you sure you want to leave? All unsaved data will be lost.'
        }
      />

      <main className={styles.edit}>
        <h2 className={styles.edit__header}>Training edition</h2>
        <TrainingForm
          exercisesCollection={exercisesCollection}
          onSubmitToFirebase={handleSubmitToFirebase}
        />
      </main>
    </>
  );
};

export default EditTraining;
