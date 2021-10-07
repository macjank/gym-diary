import React, { useCallback, useEffect, useState } from 'react';

const ExerciseBaseContext = React.createContext({
  exerciseBase: [],
});

export const ExerciseBaseContextProvider = ({ children }) => {
  const [exerciseBase, setExerciseBase] = useState([]);

  const url =
    'https://gym-diary-7ff93-default-rtdb.firebaseio.com/exerciseBase.json';

  const getExerciseBase = useCallback(async () => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw Error('something went wrong. cannot load exercise base');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  useEffect(() => {
    getExerciseBase();
  }, [getExerciseBase]);

  const contextValue = {
    exerciseBase,
  };

  return (
    <ExerciseBaseContext.Provider value={contextValue}>
      {children}
    </ExerciseBaseContext.Provider>
  );
};
