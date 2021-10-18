import React from 'react';
import { Link } from 'react-router-dom';
import TrainingsPreview from '../components/Trainings/TrainingsPreview';
import styles from '../styles/pages/Home.module.scss';

const Home = () => {
  return (
    <main className={styles.home}>
      <TrainingsPreview />
      <div className={styles.btnContainer}>
        <Link to='/new-training'>
          <button className={styles.btnNewTraining}>Add new training</button>
        </Link>
      </div>
    </main>
  );
};

export default Home;
