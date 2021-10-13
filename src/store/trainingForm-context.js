import React from 'react';
import { useReducer, useCallback } from 'react/cjs/react.development';
import { useImmerReducer } from 'use-immer';

const TrainingFormContext = React.createContext({
  exercises: [],
  onChangeDate: () => {},
  onChangeLocation: () => {},
  onAddBlankExerciseForm: () => {},
  onChangeExerciseInfo: () => {},
});

const initialTrainingState = {
  date: '',
  location: '',
  exercises: [],
};

const trainingStateReducer = (draft, action) => {
  if (action.type === 'CLEAR_FORM') {
    return initialTrainingState;
  } else if (action.type === 'ADD_BLANK_EXERCISE') {
    const blankExercise = {
      id: action.id,
      musclePart: '',
      exerciseName: '',
      sets: [],
    };

    draft.exercises.push(blankExercise);
  } else if (action.type === 'CHANGE_DATE') {
    draft.date = action.date;
  } else if (action.type === 'CHANGE_LOCATION') {
    draft.location = action.location;
  } else if (action.type === 'EDIT_EXERCISE') {
    const editedExercise = draft.exercises.find(item => item.id === action.id);
    editedExercise.musclePart = action.musclePart;
    editedExercise.exerciseName = action.exerciseName;
  } else if (action.type === 'ADD_BLANK_SET') {
    const exerciseId = action.exerciseId;
    const editedExercise = draft.exercises.find(
      exercise => exercise.id === exerciseId
    );

    const blankSet = {
      weight: null,
      reps: null,
    };

    editedExercise.sets.push(blankSet);
  } else if (action.type === 'EDIT_SET') {
    const editedExercise = draft.exercises.find(
      exercise => exercise.id === action.parentId
    );

    const editedSet = editedExercise.sets[action.id];

    editedSet.weight = action.weight;
    editedSet.reps = action.reps;
  }
};

export const TrainingFormContextProvider = props => {
  const [trainingState, dispatch] = useImmerReducer(
    trainingStateReducer,
    initialTrainingState
  );

  // const [trainingState, dispatch] = useReducer(
  //   trainingStateReducer,
  //   initialTrainingState
  // );

  const clearForm = useCallback(() => {
    dispatch({ type: 'CLEAR_FORM' });
  }, [dispatch]);

  const changeDate = date => {
    dispatch({ type: 'CHANGE_DATE', date });
  };

  const changeLocation = location => {
    dispatch({ type: 'CHANGE_LOCATION', location });
  };

  const addBlankExerciseForm = () => {
    const id = Date.now();
    dispatch({ type: 'ADD_BLANK_EXERCISE', id });
  };

  const addBlankSetForm = exerciseId => {
    dispatch({ type: 'ADD_BLANK_SET', exerciseId });
  };

  const changeExerciseInfo = useCallback((id, musclePart, exerciseName) => {
    dispatch({ type: 'EDIT_EXERCISE', id, musclePart, exerciseName });
  }, []);

  const changeSetInfo = ({ parentId, id, weight, reps }) => {
    console.log(parentId, id, weight, reps);
    dispatch({ type: 'EDIT_SET', parentId, id, weight, reps });
  };

  const contextValue = {
    exercises: trainingState.exercises,
    onChangeDate: changeDate,
    onChangeLocation: changeLocation,
    onAddBlankExerciseForm: addBlankExerciseForm,
    onChangeExerciseInfo: changeExerciseInfo,
    onStartNewForm: clearForm,
    onAddBlankSetForm: addBlankSetForm,
    onChangeSetInfo: changeSetInfo,
  };

  return (
    <TrainingFormContext.Provider value={contextValue}>
      {props.children}
    </TrainingFormContext.Provider>
  );
};

export default TrainingFormContext;
