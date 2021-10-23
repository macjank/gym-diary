import { configureStore } from '@reduxjs/toolkit';
import trainingFormSlice from './trainingForm-slice';
import exercisesBaseSlice from './exercisesBase-slice';
import trainingsBaseSlice from './trainingsBase-slice';

const store = configureStore({
  reducer: {
    exercisesBase: exercisesBaseSlice.reducer,
    trainingsBase: trainingsBaseSlice.reducer,
    trainingForm: trainingFormSlice.reducer,
  },
});

export default store;
