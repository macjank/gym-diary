import { exercisesBaseActions } from './exercisesBase-slice';

const URL =
  'https://gym-diary-7ff93-default-rtdb.firebaseio.com/exerciseBase.json';

export const getExercises = () => {
  return async dispatch => {
    const sendRequest = async () => {
      const response = await fetch(URL);

      if (!response.ok) {
        throw Error('could not get exercises data');
      }

      const data = await response.json();

      dispatch(exercisesBaseActions.replaceExercisesBase(data));
    };

    try {
      sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};
