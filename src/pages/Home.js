import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TrainingsList from '../components/Trainings/TrainingsList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Error from '../components/UI/Error';
import styles from '../styles/pages/Home.module.scss';

const Home = () => {
  const { isLoading, isError } = useSelector(state => state.trainingsBase);

  const numOfTrainingsToShow = 3;

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <Error />;

  return (
    <>
      <main className={styles.home}>
        <section className={styles.home__content}>
          <h2 className={styles.home__title}>Last trainings</h2>
          <TrainingsList numOfTrainings={numOfTrainingsToShow} />
          <Link to='/trainings'>
            <button className={styles.btnMore}>Show more</button>
          </Link>
          <Link to='/new-training'>
            <button className={styles.btnAdd}>Add new training</button>
          </Link>
        </section>
      </main>
    </>
  );
};

export default Home;
