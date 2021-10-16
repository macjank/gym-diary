import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exercises: [],
};

const exercisesBaseSlice = createSlice({
  name: 'exercisesBase',
  initialState,
  reducers: {
    replaceExercisesBase(state, action) {
      state.exercises = action.payload;
    },
    addExerciseToBase(state, action) {
      state.exercises.push(action.payload);
    },
  },
});

export const exercisesBaseActions = exercisesBaseSlice.actions;

export default exercisesBaseSlice;
