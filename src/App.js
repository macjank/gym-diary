import { useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import NewTrainingForm from "./components/NewTrainingForm";
import Trainings from "./components/Trainings";
import Button from "./components/UI/Button";
import TrainingsContext from "./store/trainings-context";

function App() {
  const { isTrainingFormOpen, onOpenNewTrainingForm } =
    useContext(TrainingsContext);

  return (
    <>
      <Navbar />
      <Button onClick={onOpenNewTrainingForm} />
      {isTrainingFormOpen && <NewTrainingForm />}
      <Trainings />
    </>
  );
}

export default App;
