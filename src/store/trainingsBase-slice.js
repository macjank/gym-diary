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
      state.trainings.push(action.payload);
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
