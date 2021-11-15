import React from 'react';
import { useState, useEffect } from 'react';
import SetForm from './SetForm';
import styles from '../../styles/TrainingForm/ExerciseForm.module.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { trainingFormActions } from '../../store/trainingForm-slice';
import { FaTimes, FaAngleDown } from 'react-icons/fa';

const ExerciseForm = ({ exercisesCollection, id, index }) => {
  const dispatch = useDispatch();
  const { exercises, formError } = useSelector(state => state.trainingForm);

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

  //we use this for collapsing the form of exercise
  const [isExerciseFormVisible, setIsExerciseFormVisible] = useState(true);

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

  //if there is formError, we mark both muscle and exercise as touched
  useEffect(() => {
    if (formError.isError) {
      setIsMuscleTouched(true);
      setIsExerciseTouched(true);
    }
  }, [formError.isError]);

  const handleAddNewSetForm = () => {
    dispatch(trainingFormActions.addBlankSetForm(id));
  };

  const handleRemoveExercise = () => {
    dispatch(trainingFormActions.removeExercise(id));
  };

  const handleToggleExerciseVisible = () => {
    setIsExerciseFormVisible(prevState => !prevState);
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
        <div className={styles.exerciseForm__title__icons}>
          <FaAngleDown
            size='40px'
            onClick={handleToggleExerciseVisible}
            style={
              isExerciseFormVisible && {
                transform: 'rotate(180deg)',
              }
            }
          />
          <FaTimes size='30px' onClick={handleRemoveExercise} />
        </div>
      </div>

      {isExerciseFormVisible && (
        <>
          <div className={styles.exerciseForm__muscle}>
            <div className={muscleClasses}>
              <label htmlFor='muscle'>Muscle part:</label>
              <select
                name='muscle'
                id='muscle'
                value={selectedMusclePart}
                onChange={e => setSelectedMusclePart(e.target.value)}
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
                onChange={e => setSelectedExercise(e.target.value)}
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
        </>
      )}
    </div>
  );
};

export default ExerciseForm;
