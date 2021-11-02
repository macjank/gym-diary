// import { exercisesBaseActions } from './exercisesBase-slice';

// const URL =
//   'https://gym-diary-7ff93-default-rtdb.firebaseio.com/exerciseBase.json';

// export const getExercises = () => {
//   return async dispatch => {
//     dispatch(exercisesBaseActions.setIsLoading(true));

//     const sendRequest = async () => {
//       const response = await fetch(URL);

//       if (!response.ok) {
//         throw Error('could not get exercises data');
//       }

//       const data = await response.json();

//       dispatch(exercisesBaseActions.replaceExercisesBase(data));
//     };

//     try {
//       await sendRequest();
//       dispatch(exercisesBaseActions.setIsError(false));
//       dispatch(exercisesBaseActions.setIsLoading(false));
//     } catch (error) {
//       dispatch(exercisesBaseActions.setIsError(true));
//       dispatch(exercisesBaseActions.setIsLoading(false));
//       console.log(error);
//     }
//   };
// };

// export const sendExercises = data => {
//   return async () => {
//     const sendRequest = async () => {
//       const response = await fetch(URL, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw Error('could not send data');
//       }
//     };

//     try {
//       sendRequest();
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
