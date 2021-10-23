import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Prompt } from 'react-router';
import TrainingForm from '../components/TrainingForm/TrainingForm';
import { trainingFormActions } from '../store/trainingForm-slice';

const EditTraining = () => {
  const dispatch = useDispatch();

  //we clean the form after component gets unmounted
  //we force user to save changes before that by returning <Prompt /> with always when=true
  useEffect(() => {
    return () => dispatch(trainingFormActions.clearForm());
  }, [dispatch]);

  return (
    <>
      <Prompt
        when={true}
        message={() =>
          "All of the changes will be discarded. Click 'Save' to keep them."
        }
      />
      <main>
        <h2>Training edition</h2>
        <TrainingForm />
      </main>
    </>
  );
};

export default EditTraining;
