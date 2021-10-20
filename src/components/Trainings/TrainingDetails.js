import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styles from '../../styles/Trainings/TrainingDetails.module.scss';
import LoadingSpinner from '../UI/LoadingSpinner';
import ExerciseDetails from './ExerciseDetails';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { trainingFormActions } from '../../store/trainingForm-slice';
import { trainingsBaseActions } from '../../store/trainingsBase-slice';
import Modal from '../UI/Modal';

const TrainingDetails = () => {
  const { trainingId } = useParams();
  const { trainings, isLoading } = useSelector(state => state.trainingsBase);
  const history = useHistory();
  const dispatch = useDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (isLoading) {
    return (
      <main className={styles.loadingContainer}>
        <LoadingSpinner />
      </main>
    );
  }

  if (trainings.every(training => training.id !== trainingId)) {
    return (
      <main className={styles.notFound}>
        <h2>Training not found</h2>
        <Link to='/'>
          <button>Go home</button>
        </Link>
      </main>
    );
  }

  const { location, date, exercises } = trainings.find(
    training => training.id === trainingId
  );

  const exercisesDetails = exercises.map(exercise => {
    const { exerciseName, musclePart, sets, id } = exercise;
    return (
      <ExerciseDetails
        key={id}
        id={id}
        exerciseName={exerciseName}
        musclePart={musclePart}
        sets={sets}
      />
    );
  });

  const handleEditTraining = () => {
    history.push('/new-training');
    dispatch(
      trainingFormActions.replaceData({
        date,
        location,
        id: trainingId,
        exercises,
      })
    );
  };

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);

  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleRemoveTraining = () => {
    history.replace('/');
    dispatch(trainingsBaseActions.removeTraining(trainingId));
  };

  const modal = (
    <Modal onClose={handleCloseDeleteModal}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalContent__header}>
          Are you sure you want to delete this training?
        </h2>
        <div className={styles.modalContent__buttons}>
          <button onClick={handleCloseDeleteModal}>Not so sure...</button>
          <button onClick={handleRemoveTraining}>Yes</button>
        </div>
      </div>
    </Modal>
  );

  return (
    <>
      {isDeleteModalOpen && modal}
      <main className={styles.training}>
        <div className={styles.training__title}>
          <h2>Training details</h2>
          <div className={styles.training__title__icons}>
            <FaEdit size='30px' onClick={handleEditTraining} />
            <FaTrashAlt size='30px' onClick={handleOpenDeleteModal} />
          </div>
        </div>
        <div className={styles.training__overalInfo}>
          <h3>
            Date: <span>{date}</span>
          </h3>
          <h3>
            Location: <span>{location}</span>
          </h3>
        </div>
        <div className={styles.training__details}>
          <h3 className={styles.training__details__title}>Exercises:</h3>
          <ul className={styles.training__details__exercises}>
            {exercisesDetails}
          </ul>
        </div>
      </main>
    </>
  );
};

export default TrainingDetails;
