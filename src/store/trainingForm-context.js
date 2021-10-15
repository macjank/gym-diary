import React from 'react';
import { useReducer, useCallback, useState } from 'react/cjs/react.development';
import { useImmerReducer } from 'use-immer';
import checkFormValidity from '../helpers/checkFormValidity';

const URL =
  'https://gym-diary-7ff93-default-rtdb.firebaseio.com/trainings.json';

const TrainingFormContext = React.createContext({
  date: '',
  location: '',
  exercises: [],
  onClearForm: () => {},
  onChangeDate: () => {},
  onChangeLocation: () => {},
  onAddBlankExerciseForm: () => {},
  onChangeExerciseInfo: () => {},
  onRemoveExerciseForm: () => {},
  onAddBlankSetForm: () => {},
  onChangeSetInfo: () => {},
  onRemoveSetForm: () => {},
  onSubmitForm: () => {},
  isSubmiting: false,
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
  } else if (action.type === 'REMOVE_EXERCISE') {
    draft.exercises = draft.exercises.filter(
      exercise => exercise.id !== action.id
    );
  } else if (action.type === 'ADD_BLANK_SET') {
    const exerciseId = action.exerciseId;
    const editedExercise = draft.exercises.find(
      exercise => exercise.id === exerciseId
    );

    const blankSet = {
      weight: undefined,
      reps: undefined,
    };

    editedExercise.sets.push(blankSet);
  } else if (action.type === 'EDIT_SET') {
    const editedExercise = draft.exercises.find(
      exercise => exercise.id === action.parentId
    );

    const editedSet = editedExercise.sets[action.id];

    editedSet.weight = action.weight;
    editedSet.reps = action.reps;
  } else if (action.type === 'REMOVE_SET') {
    console.log(`removing set: ${action.parentId} ${action.id}`);
    const { parentId, id } = action;
    const editedExercise = draft.exercises.find(
      exercise => exercise.id === parentId
    );

    editedExercise.sets = editedExercise.sets.filter(
      (set, index) => index !== id
    );
  }
};

export const TrainingFormContextProvider = props => {
  const [trainingState, dispatch] = useImmerReducer(
    trainingStateReducer,
    initialTrainingState
  );

  const [isSubmiting, setIsSubmiting] = useState(false);

  const sendTraining = async data => {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(response);
  };

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

  const changeExerciseInfo = useCallback((id, musclePart, exerciseName) => {
    dispatch({ type: 'EDIT_EXERCISE', id, musclePart, exerciseName });
  }, []);

  const removeExerciseForm = id => {
    dispatch({ type: 'REMOVE_EXERCISE', id });
  };

  const addBlankSetForm = exerciseId => {
    dispatch({ type: 'ADD_BLANK_SET', exerciseId });
  };

  const changeSetInfo = ({ parentId, id, weight, reps }) => {
    console.log(parentId, id, weight, reps);
    dispatch({ type: 'EDIT_SET', parentId, id, weight, reps });
  };

  const removeSetForm = ({ parentId, id }) => {
    dispatch({ type: 'REMOVE_SET', parentId, id });
  };

  const submitForm = () => {
    const data = {
      date: trainingState.date,
      location: trainingState.location,
      exercises: trainingState.exercises,
    };

    //checking validity
    const isFormValid = checkFormValidity(data);

    console.log(isFormValid);

    if (!isFormValid) {
      setIsSubmiting(true);
      return;
    }

    sendTraining(data);
  };

  const contextValue = {
    date: trainingState.date,
    location: trainingState.location,
    exercises: trainingState.exercises,
    onChangeDate: changeDate,
    onChangeLocation: changeLocation,
    onAddBlankExerciseForm: addBlankExerciseForm,
    onChangeExerciseInfo: changeExerciseInfo,
    onRemoveExerciseForm: removeExerciseForm,
    onClearForm: clearForm,
    onAddBlankSetForm: addBlankSetForm,
    onChangeSetInfo: changeSetInfo,
    onRemoveSetForm: removeSetForm,
    onSubmitForm: submitForm,
    isSubmiting,
  };

  return (
    <TrainingFormContext.Provider value={contextValue}>
      {props.children}
    </TrainingFormContext.Provider>
  );
};

export default TrainingFormContext;
