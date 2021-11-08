import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  date: '',
  location: '',
  id: '',
  exercises: [],
  formError: {
    isError: false,
    message: '',
  },
  isStarted: false,
};

const trainingFormSlice = createSlice({
  name: 'trainingForm',
  initialState,
  reducers: {
    startForm(state) {
      state.isStarted = true;
    },
    setId(state) {
      state.id = Date.now().toString();
    },
    clearForm() {
      return initialState;
    },
    
    changeDate(state, action) {
      state.date = action.payload;
    },
    changeLocation(state, action) {
      state.location = action.payload;
    },
    addBlankExerciseForm(state) {
      const id = Date.now().toString();
      const blankExercise = {
        id,
        musclePart: '',
        exerciseName: '',
        sets: [],
      };

      state.exercises.push(blankExercise);
    },
    editExercise(state, action) {
      const { id, musclePart, exerciseName } = action.payload;
      const editedExercise = state.exercises.find(item => item.id === id);
      editedExercise.musclePart = musclePart;
      editedExercise.exerciseName = exerciseName;
    },
    removeExercise(state, action) {
      const id = action.payload;
      state.exercises = state.exercises.filter(exercise => exercise.id !== id);
    },
    addBlankSetForm(state, action) {
      const exerciseId = action.payload;
      const editedExercise = state.exercises.find(
        exercise => exercise.id === exerciseId
      );

      const blankSet = {
        weight: undefined,
        reps: undefined,
      };

      editedExercise.sets.push(blankSet);
    },
    editSet(state, action) {
      const { parentId, id, weight, reps } = action.payload;
      const editedExercise = state.exercises.find(
        exercise => exercise.id === parentId
      );

      const editedSet = editedExercise.sets[id];

      editedSet.weight = weight;
      editedSet.reps = reps;
    },
    removeSet(state, action) {
      const { parentId, id } = action.payload;
      const editedExercise = state.exercises.find(
        exercise => exercise.id === parentId
      );

      editedExercise.sets = editedExercise.sets.filter(
        (set, index) => index !== id
      );
    },
    handleFormError(state, action) {
      state.formError = action.payload;
    },
    replaceData(state, action) {
      const { date, location, id, exercises } = action.payload;

      state.date = date;
      state.location = location;
      state.id = id;
      state.exercises = exercises;
    },
  },
});

export const trainingFormActions = trainingFormSlice.actions;

export default trainingFormSlice;
