import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trainings: [],
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

  },
});

export const trainingsBaseActions = trainingsBaseSlice.actions;

export default trainingsBaseSlice;
