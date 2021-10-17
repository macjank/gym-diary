import { trainingFormActions } from './trainingForm-slice';
import { trainingsBaseActions } from './trainingsBase-slice';

const URL =
  'https://gym-diary-7ff93-default-rtdb.firebaseio.com/trainings.json';

export const getTrainings = () => {
  return async dispatch => {
    const sendRequest = async () => {
      const response = await fetch(URL);

      if (!response.ok) {
        throw Error('could not get data');
      }

      const data = await response.json();

      const loadedTrainings = [];

      for (const key in data) {
        const singleTraining = {
          id: data[key].id,
          date: data[key].date,
          location: data[key].location,
          exercises: data[key].exercises,
        };
        loadedTrainings.push(singleTraining);
      }

      dispatch(trainingsBaseActions.replaceTrainingsBase(loadedTrainings));
    };

    try {
      sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendTrainings = data => {
  console.log(data);
  return async dispatch => {
    const sendRequest = async () => {
      const response = await fetch(URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw Error('could not send data');
      }
    };

    try {
      sendRequest();
      dispatch(trainingFormActions.clearForm());
    } catch (error) {
      console.log(error);
    }
  };
};