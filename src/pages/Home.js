import React from 'react';
import { Link } from 'react-router-dom';
import TrainingsPreview from '../components/Trainings/TrainingsPreview';
import styles from '../styles/pages/Home.module.scss';

const Home = () => {
  return (
    <main className={styles.home}>
      <TrainingsPreview />
      <Link to="/new-training">
        <button>Add new training</button>
      </Link>
    </main>
  );
};

export default Home;
