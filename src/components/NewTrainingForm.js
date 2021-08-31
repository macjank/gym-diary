import { useRef, useState } from "react";
import styles from "./NewTrainingForm.module.css";
import SinglePractice from "./SinglePractice";
import Button from "./UI/Button";

const NewTrainingForm = () => {
  const [practiceForms, setPracticeForms] = useState([]);
  const [practices, setPractices] = useState([]);

  const dateRef = useRef();
  const locationRef = useRef();

  const arePracticesEntered =
    practices.length !== 0 &&
    practices.every(
      practice =>
        practice["muscle part"] !== undefined &&
        practice["practice name"] !== undefined
    );

  const areSetsEntered = practices.every(
    practice =>
      practice.sets.length !== 0 &&
      practice.sets.every(
        set => set.weight.trim() !== "" && set.reps.trim() !== ""
      )
  );

  const areSetsNotZero = practices.every(practice =>
    practice.sets.every(
      set => set.weight.trim() !== "0" && set.reps.trim() !== "0"
    )
  );

  const sendNewTraining = async newTraining => {
    const response = await fetch(
      "https://gym-diary-7ff93-default-rtdb.firebaseio.com/trainings.json",
      {
        method: "POST",
        body: JSON.stringify(newTraining),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!dateRef.current.value || locationRef.current.value.trim() === "") {
      console.log("please enter date and location");
      return;
    }

    if (!arePracticesEntered || !areSetsEntered) {
      console.log("please enter all of the practices details");
      return;
    }

    if (!areSetsNotZero) {
      console.log("weight and reps must not be 0");
      return;
    }

    console.log("submited");
    console.log(practices);
  };

  //adding new practice from SinglePractice component to the state of practices
  const handleAddNewPractice = (id, muscle, practiceName, sets) => {
    const newPractice = {
      id: id,
      "muscle part": muscle,
      "practice name": practiceName,
      sets: sets,
    };

    const tempPractices = practices.filter(practice => practice.id !== id);

    setPractices([...tempPractices, newPractice]);
  };

  //adding a form for another practice to the screen
  const handleAddNewPracticeForm = () => {
    const timestamp = Date.now();
    const newPracticeForm = (
      <SinglePractice
        key={timestamp}
        id={timestamp}
        onAddNewPractice={handleAddNewPractice}
      />
    );

    setPracticeForms(prevPracticeForms => [
      ...prevPracticeForms,
      newPracticeForm,
    ]);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles["form__overall"]}>
        <label htmlFor="date">Data treningu</label>
        <input ref={dateRef} type="date" id="date" />
        <label htmlFor="location">Lokalizacja</label>
        <input ref={locationRef} type="text" id="location" />
      </div>
      <div className={styles["form__details"]}>
        {practiceForms}
        <button type="button" onClick={handleAddNewPracticeForm}>
          Add new practice
        </button>
      </div>
      <Button onClick={handleSubmit} content="Wyślij"></Button>
    </form>
  );
};

export default NewTrainingForm;
