import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import styles from '../../styles/Trainings/TrainingDetails.module.scss';
import LoadingSpinner from '../UI/LoadingSpinner';
import Error from '../UI/Error';
import ExerciseDetails from './ExerciseDetails';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { trainingFormActions } from '../../store/trainingForm-slice';
import { trainingsBaseActions } from '../../store/trainingsBase-slice';
import useConfirmModal from '../../hooks/useConfirmModal';
import useTwoActionsModal from '../../hooks/useTwoActionsModal';
import useFirestore from '../../hooks/useFirestore';
import { useSelector } from 'react-redux';

const TrainingDetails = () => {
  const { trainingId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isStarted } = useSelector(state => state.trainingForm);

  const {
    response: training,
    getDocument,
    deleteDocument,
  } = useFirestore('trainings');

  useEffect(() => {
    getDocument(trainingId);
  }, []);

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
    question:
      'There is already some unsaved data in the form. What you gonna do???',
    onCancelAction: handleShowCurrentForm,
    onConfirmAction: handleEditTraining,
    cancelBtnText: 'Show me this unsaved form',
    confirmBtnText: 'Discard this data and let me edit this training',
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
    history.push('/edit-training');
    dispatch(
      trainingFormActions.replaceData({
        date,
        location,
        id: trainingId,
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
    console.log('to be implemented');
    // if (!isStarted) {
    //   handleEditTraining();
    // } else {
    //   openEditionModal();
    // }
  };

  return (
    <>
      {isDeleteModalOpen && deleteModal}
      {isEditionModalOpen && editionModal}
      <main className={styles.training}>
        <div className={styles.training__title}>
          <h2>Training details</h2>
          <div className={styles.training__title__icons}>
            <FaEdit size='30px' onClick={handleTryToEdit} />
            <FaTrashAlt size='30px' onClick={openDeleteModal} />
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
