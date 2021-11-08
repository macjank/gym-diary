import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Error from '../components/UI/Error';
import ExerciseDetails from '../components/Trainings/ExerciseDetails';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { trainingFormActions } from '../store/trainingForm-slice';
import useConfirmModal from '../hooks/useConfirmModal';
import useTwoActionsModal from '../hooks/useTwoActionsModal';
import useFirestore from '../hooks/useFirestore';
import { useSelector } from 'react-redux';

import styles from '../styles/pages/TrainingDetails.module.scss';

const TrainingDetails = () => {
  const { trainingId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isStarted } = useSelector(state => state.trainingForm);

  //thanks to this I can avoid infinite loop caused by useEffect
  const [isFirstRun, setIsFirstRun] = useState(true);

  const {
    response: training,
    getDocument,
    deleteDocument,
  } = useFirestore('trainings');

  useEffect(() => {
    if (isFirstRun) {
      setIsFirstRun(false);
      getDocument(trainingId);
    }
  }, [trainingId, getDocument, isFirstRun]);

  // const { trainings, error } = useSelector(state => state.trainingsBase);
  // const { id } = useSelector(state => state.trainingForm);

  const {
    modal: deleteModal,
    onOpenModal: openDeleteModal,
    isModalOpen: isDeleteModalOpen,
  } = useConfirmModal({
    question: 'Are you sure you want to delete this training?',
    onConfirmAction: handleDeleteTraining,
  });

  const {
    modal: editionModal,
    openModal: openEditionModal,
    isModalOpen: isEditionModalOpen,
  } = useTwoActionsModal({
    question: 'There is some unsaved data in the form. What you gonna do???',
    onCancelAction: handleShowCurrentForm,
    onConfirmAction: handleEditTraining,
    cancelBtnText: 'Show me current form',
    confirmBtnText: 'Clear the form & let me edit',
  });

  if (training.error) {
    return <Error info={training.error} />;
  }

  if (!training.document || training.isPending) {
    return <LoadingSpinner />;
  }

  const { location, date, exercises } = training.document;

  function handleShowCurrentForm() {
    history.push('/new-training');
  }

  function handleEditTraining() {
    console.log('dupa');
    history.push(`/trainings/${trainingId}/edit`);
    dispatch(
      trainingFormActions.replaceData({
        date,
        location,
        exercises,
      })
    );
  }

  function handleDeleteTraining() {
    deleteDocument(trainingId);
    //dispatch(trainingsBaseActions.removeTraining(trainingId));
    history.replace('/');
  }

  const handleTryToEdit = () => {
    if (!isStarted) {
      handleEditTraining();
    } else {
      openEditionModal();
    }
  };

  return (
    <>
      {isDeleteModalOpen && deleteModal}
      {isEditionModalOpen && editionModal}
      <main className={styles.training}>
        <div className={styles.training__header}>
          <h2 className={styles.training__header__title}>Training details</h2>
          <div className={styles.training__header__icons}>
            <FaEdit size='35px' onClick={handleTryToEdit} />
            <FaTrashAlt size='35px' onClick={openDeleteModal} />
          </div>
        </div>
        <div className={styles.training__overal}>
          <div className={styles.training__overal__date}>
            <h3>Date</h3>
            <p>{date}</p>
          </div>
          <div className={styles.training__overal__location}>
            <h3>Location</h3>
            <p>{location}</p>
          </div>
        </div>
        <div className={styles.training__details}>
          <h3 className={styles.training__details__title}>Exercises:</h3>
          <ul className={styles.training__details__exercises}>
            {exercises.map(exercise => {
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
            })}
          </ul>
        </div>
      </main>
    </>
  );
};

export default TrainingDetails;
