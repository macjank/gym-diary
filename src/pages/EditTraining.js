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

const EditTraining = () => {
  const { trainingId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPrompt, setShowPrompt] = useState(true);

  const { user } = useSelector(state => state.auth);
  const { data: exercisesCollection, error } = useCollection('exercises', [
    'uid',
    '==',
    user.uid,
  ]);
  const { overwriteDocument } = useFirestore('trainings');

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
      history.replace('/')
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

      <main>
        <h2>Training edition</h2>
        <TrainingForm
          exercisesCollection={exercisesCollection}
          onSubmitToFirebase={handleSubmitToFirebase}
        />
      </main>
    </>
  );
};

export default EditTraining;
