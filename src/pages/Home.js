import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TrainingsList from '../components/Trainings/TrainingsList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Error from '../components/UI/Error';
import styles from '../styles/pages/Home.module.scss';
import useCollection from '../hooks/useCollection';

const Home = () => {
  const { user } = useSelector(state => state.auth);
  const numOfTrainingsToShow = 3;

  //getting the trainings data from firebase
  //ordering by date 
  //limit: numOfTrainingsToShow
  const { data: trainings, error } = useCollection(
    'trainings',
    ['uid', '==', user.uid],
    ['date', 'desc'],
    numOfTrainingsToShow
  );

  if (error) return <Error />;
  if (!trainings) return <LoadingSpinner />;

  let content;

  if (trainings.length === 0) {
    content = (
      <div className={styles.empty}>
        <h2>The list is empty. Add some trainings</h2>
      </div>
    );
  } else {
    content = (
      <>
        <h2 className={styles.home__title}>Last trainings</h2>
        <TrainingsList trainings={trainings} />
        <Link to='/trainings'>
          <button className={styles.btnMore}>Show more</button>
        </Link>
      </>
    );
  }

  return (
    <>
      <main className={styles.home}>
        <section className={styles.home__content}>
          {content}
          <Link to='/new-training'>
            <button className={styles.btnAdd}>Add new training</button>
          </Link>
        </section>
      </main>
    </>
  );
};

export default Home;
