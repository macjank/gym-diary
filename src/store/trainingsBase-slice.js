import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trainings: [],
  isLoading: true,
  isError: false,
};

const trainingsBaseSlice = createSlice({
  name: 'trainingsBase',
  initialState,
  reducers: {
    replaceTrainingsBase(state, action) {
      state.trainings = action.payload;
    },
    addTraining(state, action) {
      const { date, location, id, exercises } = action.payload;

      const isEditing = state.trainings.some(training => training.id === id);

      if (isEditing) {
        let editedTraining = state.trainings.find(
          training => training.id === id
        );

        editedTraining.date = date;
        editedTraining.location = location;
        editedTraining.exercises = exercises;
      } else {
        state.trainings.push(action.payload);
      }
    },
    removeTraining(state, action) {
      const id = action.payload;
      state.trainings = state.trainings.filter(training => training.id !== id);
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsError(state, action) {
      state.isError = action.isError;
    },
  },
});

export const trainingsBaseActions = trainingsBaseSlice.actions;

export default trainingsBaseSlice;
