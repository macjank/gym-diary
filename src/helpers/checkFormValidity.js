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
      status: false,
      message: 'Pick some date',
    };
    return formValidity;
  }

  if (!isLocationValid) {
    formValidity = {
      status: false,
      message: 'Invalid location',
    };
    return formValidity;
  }

  if (!areExerciseFormsPresent) {
    formValidity = {
      status: false,
      message: 'Enter some exercises',
    };
    return formValidity;
  }

  if (!areExerciseFormsValid) {
    formValidity = {
      status: false,
      message: 'Correct your exercise data',
    };
    return formValidity;
  }

  if (!areSetFormsPresent) {
    formValidity = {
      status: false,
      message: 'Some of your exercises have no sets.',
    };
    return formValidity;
  }

  if (!areSetFormsValid) {
    formValidity = {
      status: false,
      message: 'Correct your sets data',
    };
    return formValidity;
  }

  formValidity = {
    status: true,
    message: '',
  };

  return formValidity;

  // const isFormValid =
  //   isDateValid && isLocationValid && areExerciseFormsValid && areSetFormsValid;

  // return isFormValid;
};

export default checkFormValidity;
