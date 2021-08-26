import React, { useCallback, useEffect, useState } from "react";

const TrainingsContext = React.createContext({
  trainings: [],
  isTrainingFormOpen: false,
  onOpenNewTrainingForm: () => {},
  onCloseNewTrainingForm: () => {},
});

export const TrainingsContextProvider = props => {
  const [trainings, setTrainings] = useState([]);
  const [isTrainingFormOpen, setIsTrainingFormOpen] = useState(false);

  const url =
    "https://gym-diary-7ff93-default-rtdb.firebaseio.com/trainings.json";

  const getTrainings = useCallback(async () => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Could not fetch data");
      }

      const data = await response.json();


      setTrainings(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(getTrainings, [getTrainings]);

  const openNewTrainingForm = () => {
    setIsTrainingFormOpen(true);
  };

  const closeNewTrainingForm = () => {
    setIsTrainingFormOpen(false);
  };

  const contextValue = {
    trainings: trainings,
    isTrainingFormOpen: isTrainingFormOpen,
    onOpenNewTrainingForm: openNewTrainingForm,
    onCloseNewTrainingForm: closeNewTrainingForm,
  };

  return (
    <TrainingsContext.Provider value={contextValue}>
      {props.children}
    </TrainingsContext.Provider>
  );
};

export default TrainingsContext;
