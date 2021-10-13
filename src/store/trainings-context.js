import React, { useCallback, useEffect, useState } from 'react';

const TrainingsContext = React.createContext({
  trainings: [],
});

export const TrainingsContextProvider = ({ children }) => {
  const [trainings, setTrainings] = useState([]);

  const url =
    'https://gym-diary-7ff93-default-rtdb.firebaseio.com/trainings.json';

  const getTrainings = useCallback(async () => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Could not fetch data');
      }

      const data = await response.json();

      const loadedTrainings = [];

      for (const key in data) {
        const singleTraining = {
          id: key,
          date: data[key].date,
          location: data[key].location,
        };
        loadedTrainings.push(singleTraining);
      }

      setTrainings(loadedTrainings);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(getTrainings, [getTrainings]);

  const contextValue = {
    trainings,
  };

  return (
    <TrainingsContext.Provider value={contextValue}>
      {children}
    </TrainingsContext.Provider>
  );
};

export default TrainingsContext;
