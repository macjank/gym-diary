import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import ExerciseBaseContext from '../../store/exerciseBase-context';
import TrainingFormContext from '../../store/trainingForm-context';
import SetForm from './SetForm';
import styles from '../../styles/TrainingForm/ExerciseForm.module.scss';

const ExerciseForm = ({ id }) => {
  const {
    exercises,
    onChangeExerciseInfo,
    onRemoveExerciseForm,
    onAddBlankSetForm,
  } = useContext(TrainingFormContext);

  const { exerciseBase } = useContext(ExerciseBaseContext);

  const sets = exercises.find(item => item.id === id).sets;

  const currentExercise = exercises.find(exercise => exercise.id === id);

  //state for current inputs values
  const [selectedMusclePart, setSelectedMusclePart] = useState(
    currentExercise.musclePart !== '' ? currentExercise.musclePart : '---'
  );
  const [selectedExercise, setSelectedExercise] = useState(
    currentExercise.exerciseName !== '' ? currentExercise.exerciseName : '---'
  );

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
    onChangeExerciseInfo(id, selectedMusclePart, selectedExercise);
  }, [id, onChangeExerciseInfo, selectedMusclePart, selectedExercise]);

  const handleChangeMusclePart = e => {
    setSelectedMusclePart(e.target.value);
  };

  const handleChangeExercise = e => {
    setSelectedExercise(e.target.value);
  };

  const handleAddNewSetForm = () => {
    onAddBlankSetForm(id);
  };

  const handleRemoveExercise = () => {
    onRemoveExerciseForm(id);
  };

  const setsForms = sets.map((set, index) => (
    <SetForm key={index} parentId={id} id={index} />
  ));

  return (
    <div className={styles.exerciseForm}>
      <div>
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

      {setsForms}

      <button type='button' onClick={handleAddNewSetForm}>
        Add set
      </button>
      <button type='button' onClick={handleRemoveExercise}>
        Remove exercise
      </button>
    </div>
  );
};

export default ExerciseForm;
