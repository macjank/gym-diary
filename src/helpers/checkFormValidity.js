import checkValidityName from '../helpers/checkValidityName';
import checkValidityNumber from '../helpers/checkValidityNumber';

const checkFormValidity = data => {
  let formValidity = {};

  const isDateValid = checkValidityName(data.date);
  const isLocationValid = checkValidityName(data.location);
  const areExerciseFormsPresent = data.exercises.length > 0;

  const areExerciseFormsValid = data.exercises.every(exercise => {
    const isMuscleValid = checkValidityName(exercise.musclePart);
    const isExerciseNameValid = checkValidityName(exercise.exerciseName);

    return isMuscleValid && isExerciseNameValid;
  });

  const areSetFormsPresent = data.exercises.every(exercise => {
    return exercise.sets.length > 0;
  });

  const areSetFormsValid = data.exercises.every(exercise => {
    return exercise.sets.every(set => {
      const isWeightValid = checkValidityNumber(set.weight);
      const isRepsValid = checkValidityNumber(set.reps);

      return isWeightValid && isRepsValid;
    });
  });

  if (!isDateValid) {
    formValidity = {
      isError: true,
      message: 'Pick some date',
    };
    return formValidity;
  }

  if (!isLocationValid) {
    formValidity = {
      isError: true,
      message: 'Invalid location',
    };
    return formValidity;
  }

  if (!areExerciseFormsPresent) {
    formValidity = {
      isError: true,
      message: 'Enter some exercises',
    };
    return formValidity;
  }

  if (!areExerciseFormsValid) {
    formValidity = {
      isError: true,
      message: 'Correct your exercise data',
    };
    return formValidity;
  }

  if (!areSetFormsPresent) {
    formValidity = {
      isError: true,
      message: 'Some of your exercises have no sets.',
    };
    return formValidity;
  }

  if (!areSetFormsValid) {
    formValidity = {
      isError: true,
      message: 'Correct your sets data',
    };
    return formValidity;
  }

  formValidity = {
    isError: false,
    message: '',
  };

  return formValidity;

  // const isFormValid =
  //   isDateValid && isLocationValid && areExerciseFormsValid && areSetFormsValid;

  // return isFormValid;
};

export default checkFormValidity;
