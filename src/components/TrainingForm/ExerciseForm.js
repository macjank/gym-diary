import React from 'react';
import { useState, useEffect } from 'react';
import SetForm from './SetForm';
import styles from '../../styles/TrainingForm/ExerciseForm.module.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { trainingFormActions } from '../../store/trainingForm-slice';
import { FaTimes } from 'react-icons/fa';

const ExerciseForm = ({ exercisesCollection, id, index }) => {
  const { exercises, formError } = useSelector(state => state.trainingForm);
  const dispatch = useDispatch();

  const currentExercise = exercises.find(exercise => exercise.id === id);
  const sets = currentExercise.sets;

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
    selectedMusclePart === '---' && isMuscleTouched && formError.isError;
  const isExerciseNOK =
    selectedExercise === '---' && isExerciseTouched && formError.isError;

  //these variables are here to dynamically change options in the input fields
  const possibleMuscleParts = exercisesCollection.map(item => item.muscleName);
  const possibleExercises = [];

  exercisesCollection.forEach(item => {
    if (item.muscleName === selectedMusclePart) {
      item.muscleExercises.forEach(exercise =>
        possibleExercises.push(exercise)
      );
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
    if (formError.isError) {
      setIsMuscleTouched(true);
      setIsExerciseTouched(true);
    }
  }, [formError.isError]);

  const handleChangeMusclePart = e => {
    setSelectedMusclePart(e.target.value);
  };

  const handleChangeExercise = e => {
    setSelectedExercise(e.target.value);
  };

  const handleAddNewSetForm = () => {
    dispatch(trainingFormActions.addBlankSetForm(id));
  };

  const handleRemoveExercise = () => {
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
        <h2 className={styles.exerciseForm__title__name}>
          Exercise {index + 1}
        </h2>
        <div className={styles.exerciseForm__title__icon}>
          <FaTimes size='30px' onClick={handleRemoveExercise} />
        </div>
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
