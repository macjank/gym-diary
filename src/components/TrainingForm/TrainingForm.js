import React, { useContext } from 'react';
import { useEffect } from 'react/cjs/react.development';
import TrainingFormContext from '../../store/trainingForm-context';
import styles from '../../styles/TrainingForm/TrainingForm.module.scss';
import ExerciseForm from './ExerciseForm';

const TrainingForm = () => {
  const {
    exercises,
    onChangeDate,
    onChangeLocation,
    onAddBlankExerciseForm,
    onStartNewForm,
  } = useContext(TrainingFormContext);

  //clearing the form after de-mounting the component
  useEffect(() => {
    //onStartNewForm();

    return () => onStartNewForm();
  }, [onStartNewForm]);

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleChangeDate = e => {
    const date = e.target.value;
    onChangeDate(date);
  };

  const handleChangeLocation = e => {
    const location = e.target.value;
    onChangeLocation(location);
  };

  // const handleChangeExerciseInfo = useCallback(
  //   (id, musclePart, exerciseName) => {
  //     //console.log(id, musclePart, exerciseName);
  //     dispatch({ type: 'EDIT_EXERCISE', id, musclePart, exerciseName });
  //   },
  //   []
  // );

  const handleAddExerciseForm = () => {
    onAddBlankExerciseForm();
  };

  const exercisesContent = exercises.map(exercise => (
    <ExerciseForm key={exercise.id} id={exercise.id} />
  ));

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form__generalInfo}>
        <label htmlFor='date'>Date</label>
        <input type='date' id='date' onChange={handleChangeDate} required />
        <label htmlFor='location'>Location (gym)</label>
        <input
          type='text'
          id='location'
          onChange={handleChangeLocation}
          required
        />
      </div>

      {exercisesContent}

      <button type='button' onClick={handleAddExerciseForm}>
        Add new exercise
      </button>
      <button type='submit'>Submit form</button>
    </form>
  );
};

export default TrainingForm;
