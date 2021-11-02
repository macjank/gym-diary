import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trainings: null,
  error: null,
};

const trainingsBaseSlice = createSlice({
  name: 'trainingsBase',
  initialState,
  reducers: {
    replaceTrainings(state, action) {
      state.trainings = action.payload;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const trainingsBaseActions = trainingsBaseSlice.actions;

export default trainingsBaseSlice;
