import { configureStore } from '@reduxjs/toolkit';
import trainingFormSlice from './trainingForm-slice';
import exercisesBaseSlice from './exercisesBase-slice';
import trainingsBaseSlice from './trainingsBase-slice';
import modalSlice from './modal-slice';

const store = configureStore({
  reducer: {
    exercisesBase: exercisesBaseSlice.reducer,
    trainingsBase: trainingsBaseSlice.reducer,
    trainingForm: trainingFormSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export default store;
