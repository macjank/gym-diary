import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exercisesCollection: null,
  error: null,
};

const exercisesCollectionSlice = createSlice({
  name: 'exercisesCollection',
  initialState,
  reducers: {
    replaceExercises(state, action) {
      //dispatching empty string if there are no exercises in the firebase
      state.exercisesCollection = action.payload;
      state.error = null;
    },
    // addMuscleToBase(state, action) {
    //   const newMuscleObject = {
    //     musclePart: action.payload,
    //   };
    //   state.exercises.push(newMuscleObject);
    // },
    // addExerciseToBase(state, action) {
    //   const muscleItem = state.exercises.find(
    //     item => item.musclePart === action.payload.musclePart
    //   );
    //   if (!muscleItem.exercises) {
    //     muscleItem.exercises = [];
    //   }
    //   muscleItem.exercises.push(action.payload.exerciseName);
    // },
    // removeMuscle(state, action) {
    //   state.exercises = state.exercises.filter(
    //     exercise => exercise.musclePart !== action.payload
    //   );
    // },
    // removeExercise(state, action) {
    //   const { musclePart, exercise: exerciseName } = action.payload;
    //   const muscleItem = state.exercises.find(
    //     exercise => exercise.musclePart === musclePart
    //   );

    //   muscleItem.exercises = muscleItem.exercises.filter(
    //     exercise => exercise !== exerciseName
    //   );
    // },
    // setIsLoading(state, action) {
    //   state.isLoading = action.payload;
    // },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const exercisesCollectionActions = exercisesCollectionSlice.actions;

export default exercisesCollectionSlice;
