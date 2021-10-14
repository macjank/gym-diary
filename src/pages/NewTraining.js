import React from 'react';
import TrainingForm from '../components/TrainingForm/TrainingForm';
import styles from '../styles/pages/NewTraining.module.scss';
//import { TrainingFormContextProvider } from '../store/trainingForm-context';

const NewTraining = () => {
  return (
    <main className={styles.newTraining}>
      <h2>Add new training</h2>

      <TrainingForm />
    </main>
  );
};

export default NewTraining;
