import checkValidityName from '../helpers/checkValidityName';
import checkValidityNumber from '../helpers/checkValidityNumber';

const checkFormValidity = data => {
  const isDateValid = checkValidityName(data.date);
  const isLocationValid = checkValidityName(data.location);

  const areExerciseFormsValid =
    data.exercises.length > 0 &&
    data.exercises.every(exercise => {
      const isMuscleValid = checkValidityName(exercise.musclePart);
      const isExerciseNameValid = checkValidityName(exercise.exerciseName);

      return isMuscleValid && isExerciseNameValid;
    });

  const areSetFormsValid = data.exercises.every(exercise => {
    return (
      exercise.sets.length > 0 &&
      exercise.sets.every(set => {
        const isWeightValid = checkValidityNumber(set.weight);
        const isRepsValid = checkValidityNumber(set.reps);

        return isWeightValid && isRepsValid;
      })
    );
  });

  const isFormValid =
    isDateValid && isLocationValid && areExerciseFormsValid && areSetFormsValid;

  return isFormValid;
};

export default checkFormValidity;
