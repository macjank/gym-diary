import React from 'react';
import { useState, useEffect } from 'react';
import SetForm from './SetForm';
import styles from '../../styles/TrainingForm/ExerciseForm.module.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { trainingFormActions } from '../../store/trainingForm-slice';
import { FaTimes } from 'react-icons/fa';

const ExerciseForm = ({ id, index }) => {
  const { exercises, isValidationError } = useSelector(
    state => state.trainingForm
  );
  const exerciseBase = useSelector(state => state.exercisesBase.exercises);
  const dispatch = useDispatch();

  const sets = exercises.find(item => item.id === id).sets;

  const currentExercise = exercises.find(exercise => exercise.id === id);

  //state for current inputs values
  const [selectedMusclePart, setSelectedMusclePart] = useState(
    currentExercise.musclePart !== '' ? currentExercise.musclePart : '---'
  );
  const [selectedExercise, setSelectedExercise] = useState(
    currentExercise.exerciseName !== '' ? currentExercise.exerciseName : '---'
  );

  const [isMuscleTouched, setIsMuscleTouched] = useState(false);
  const [isExerciseTouched, setIsExerciseTouched] = useState(false);

  const isMuscleNOK =
    selectedMusclePart === '---' && isMuscleTouched && isValidationError;
  const isExerciseNOK =
    selectedExercise === '---' && isExerciseTouched && isValidationError;

  //these variables are here to dynamically change options in the input fields
  const possibleMuscleParts = exerciseBase.map(item => item.musclePart);
  const possibleExercises = [];

  exerciseBase.forEach(item => {
    if (item.musclePart === selectedMusclePart) {
      item.exercises.forEach(exercise => possibleExercises.push(exercise));
    } else {
      return;
    }
  });

  //this useEffect triggers updates of the form context once the input state changes
  useEffect(() => {
    if (selectedMusclePart === '---' || selectedExercise === '---') {
      return;
    }

    dispatch(
      trainingFormActions.editExercise({
        id,
        musclePart: selectedMusclePart,
        exerciseName: selectedExercise,
      })
    );
  }, [id, selectedMusclePart, selectedExercise, dispatch]);

  useEffect(() => {
    if (isValidationError) {
      setIsMuscleTouched(true);
      setIsExerciseTouched(true);
    }
  }, [isValidationError]);

  const handleChangeMusclePart = e => {
    setSelectedMusclePart(e.target.value);
  };

  const handleChangeExercise = e => {
    setSelectedExercise(e.target.value);
  };

  const handleAddNewSetForm = () => {
    //onAddBlankSetForm(id);
    dispatch(trainingFormActions.addBlankSetForm(id));
  };

  const handleRemoveExercise = () => {
    //onRemoveExerciseForm(id);
    dispatch(trainingFormActions.removeExercise(id));
  };

  const setsForms = sets.map((set, index) => (
    <SetForm key={index} parentId={id} id={index} />
  ));

  const muscleClasses = isMuscleNOK ? `${styles.error}` : '';

  const exerciseClasses = isExerciseNOK ? `${styles.error}` : '';

  return (
    <div className={styles.exerciseForm}>
      <div className={styles.exerciseForm__title}>
        <h3>Exercise {index + 1}</h3>
        <FaTimes size='30px' onClick={handleRemoveExercise} />
      </div>
      <div className={styles.exerciseForm__muscle}>
        <div className={muscleClasses}>
          <label htmlFor='muscle'>Muscle part:</label>
          <select
            name='muscle'
            id='muscle'
            value={selectedMusclePart}
            onChange={handleChangeMusclePart}
            required
          >
            <option value='---' disabled>
              ---
            </option>
            {possibleMuscleParts.map((musclePart, index) => (
              <option key={index} value={musclePart}>
                {musclePart}
              </option>
            ))}
          </select>
        </div>
        <div className={exerciseClasses}>
          <label htmlFor='exerciseName'>Exercise name:</label>
          <select
            name='exerciseName'
            id='exerciseName'
            value={selectedExercise}
            onChange={handleChangeExercise}
            required
          >
            <option value='---' disabled>
              ---
            </option>
            {possibleExercises.map((exercise, index) => (
              <option key={index} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>
        </div>
      </div>

      {setsForms}

      <div className={styles.btnContainer}>
        <button type='button' onClick={handleAddNewSetForm}>
          Add set
        </button>
      </div>
    </div>
  );
};

export default ExerciseForm;
