import React from 'react';
import TrainingForm from '../components/TrainingForm/TrainingForm';
//import { TrainingFormContextProvider } from '../store/trainingForm-context';

const NewTraining = () => {
  return (
    <>
      <h2>Add new training</h2>

      <TrainingForm />
    </>
  );
};

export default NewTraining;
