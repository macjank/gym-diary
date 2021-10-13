import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import ExerciseBaseContext from '../../store/exerciseBase-context';
import TrainingFormContext from '../../store/trainingForm-context';
import SetForm from './SetForm';

const ExerciseForm = ({ id }) => {
  const { exerciseBase } = useContext(ExerciseBaseContext);
  const { exercises, onChangeExerciseInfo, onAddBlankSetForm } =
    useContext(TrainingFormContext);

  const sets = exercises.find(item => item.id === id).sets;

  //state for current inputs values
  const [selectedMusclePart, setSelectedMusclePart] = useState('---');
  const [selectedExercise, setSelectedExercise] = useState('---');

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

  const handleAddNewSetForm = () => {
    onAddBlankSetForm(id);
  };

  const setsForms = sets.map((set, index) => (
    <SetForm key={index} parentId={id} id={index} />
  ));

  return (
    <>
      <div>
        <label htmlFor='muscle'>Muscle part:</label>
        <select
          name='muscle'
          id='muscle'
          defaultValue='---'
          onChange={e => setSelectedMusclePart(e.target.value)}
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
          defaultValue='---'
          onChange={e => setSelectedExercise(e.target.value)}
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
    </>
  );
};

export default ExerciseForm;
