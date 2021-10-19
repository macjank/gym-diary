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
    addMuscleToBase(state, action) {
      const newMuscleObject = {
        musclePart: action.payload,
      };
      state.exercises.push(newMuscleObject);
    },
    addExerciseToBase(state, action) {
      const muscleItem = state.exercises.find(
        item => item.musclePart === action.payload.musclePart
      );
      if (!muscleItem.exercises) {
        muscleItem.exercises = [];
      }
      muscleItem.exercises.push(action.payload.exercise);
    },
    removeMuscle(state, action) {
      state.exercises = state.exercises.filter(
        exercise => exercise.musclePart !== action.payload
      );
    },
    removeExercise(state, action) {
      const { musclePart, exercise: exerciseName } = action.payload;
      const muscleItem = state.exercises.find(
        exercise => exercise.musclePart === musclePart
      );

      muscleItem.exercises = muscleItem.exercises.filter(
        exercise => exercise !== exerciseName
      );
    },
  },
});

export const exercisesBaseActions = exercisesBaseSlice.actions;

export default exercisesBaseSlice;
