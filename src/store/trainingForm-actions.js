import { Redirect, useHistory } from 'react-router';
import checkFormValidity from '../helpers/checkFormValidity';
import { trainingFormActions } from './trainingForm-slice';

const URL =
  'https://gym-diary-7ff93-default-rtdb.firebaseio.com/trainings.json';

export const sendNewTraining = data => {
  return async dispatch => {
    

    const sendRequest = async () => {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    };

    try {
      sendRequest();
      dispatch(trainingFormActions.clearForm());
    } catch (error) {
      console.log(error);
    }
  };
};
