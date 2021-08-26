import { useRef, useState } from "react";
import practicesBase from "../data/practicesBase";

const NewTrainingForm = () => {
  const [muscle, setMuscle] = useState(undefined);

  const dateRef = useRef();
  const locationRef = useRef();

  const addNewTraining = async newTraining => {
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
    const newData = {
      date: dateRef.current.value,
      location: locationRef.current.value,
    };

    console.log(newData);
    addNewTraining(newData);
  };

  let practices = [];
  practicesBase.forEach(item => {
    if (item["muscle_part"] === muscle) {
      practices = [...item.practices];
    }
  });
  console.log(practices);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Data treningu</label>
        <input ref={dateRef} type="date" id="date" />
        <label htmlFor="location">Lokalizacja</label>
        <input ref={locationRef} type="text" id="location" />
      </div>
      <div>
        <label htmlFor="practice_1">Partia mięśniowa</label>
        <select
          name="practice_1"
          id="Partia mięśniowa"
          value={muscle}
          onChange={e => setMuscle(e.target.value)}
        >
          <option style={{ display: "none" }} disabled selected value>
            {" "}
            -- select an option --{" "}
          </option>
          <option value="nogi">Nogi</option>
          <option value="klatka">Klatka</option>
          <option value="barki">Barki</option>
          <option value="plecy">Plecy</option>
          <option value="biceps">Biceps</option>
          <option value="triceps">Triceps</option>
        </select>
        <label htmlFor="practice"></label>
        <select name="practice" id="practice">
          {practices.map((practice, index) => (
            <option key={index} value={practice}>
              {practice}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default NewTrainingForm;
