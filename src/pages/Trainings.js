import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import TrainingsList from '../components/Trainings/TrainingsList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Error from '../components/UI/Error';
import styles from '../styles/pages/Trainings.module.scss';
import useCollection from '../hooks/useCollection';
import { useDispatch } from 'react-redux';
import { trainingsBaseActions } from '../store/trainingsBase-slice';

const Trainings = () => {
  // const { trainings, error } = useSelector(state => state.trainingsBase);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  //getting the trainings data from firebase
  const { data: trainings, error } = useCollection(
    'trainings',
    ['uid', '==', user.uid],
    ['date', 'desc']
  );

  useEffect(() => {
    if (error) {
      dispatch(trainingsBaseActions.setError(error));
    }
    if (trainings) {
      dispatch(trainingsBaseActions.replaceTrainings(trainings));
    }
  }, [dispatch, trainings, error]);

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
    content = <TrainingsList trainings={trainings} />;
  }

  return (
    <main className={styles.trainings}>
      <h2 className={styles.trainings__header}>All trainings</h2>
      {content}
    </main>
  );
};

export default Trainings;
