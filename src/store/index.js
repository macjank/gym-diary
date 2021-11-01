import { configureStore } from '@reduxjs/toolkit';
import trainingFormSlice from './trainingForm-slice';
import exercisesCollectionSlice from './exercisesCollection-slice';
import trainingsBaseSlice from './trainingsBase-slice';
import authSlice from './auth-slice';

const store = configureStore({
  reducer: {
    exercisesCollection: exercisesCollectionSlice.reducer,
    trainingsBase: trainingsBaseSlice.reducer,
    trainingForm: trainingFormSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
