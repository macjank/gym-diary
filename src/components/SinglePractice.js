import React, { useEffect, useState } from "react";
import practicesBase from "../data/practicesBase";
import NewSet from "./NewSet";

const SinglePractice = ({ id, onAddNewPractice }) => {
  const [muscle, setMuscle] = useState(undefined);
  const [practiceName, setPracticeName] = useState(undefined);
  const [setsForms, setSetsForms] = useState([]);
  const [sets, setSets] = useState([]);

  useEffect(() => {
    onAddNewPractice(id, muscle, practiceName, sets);
  }, [id, muscle, practiceName, sets]);

  let muscles = [];
  practicesBase.forEach(item => {
    muscles.push(item["muscle_part"]);
  });

  let practices = [];
  practicesBase.forEach(item => {
    if (item["muscle_part"] === muscle) {
      practices = [...item.practices];
    }
  });

  const handleAddNewSet = (id, weight, reps) => {
    const newSet = {
      id: id,
      weight: weight,
      reps: reps,
    };

    const tempSets = sets.filter(set => set.id !== id);

    setSets([...tempSets, newSet]);
  };

  const handleAddSetForm = () => {
    const timestamp = Date.now();
    const newSetForm = (
      <NewSet key={timestamp} id={timestamp} onAddNewSet={handleAddNewSet} />
    );

    setSetsForms(prevSetsForms => [...prevSetsForms, newSetForm]);
  };

  return (
    <React.Fragment>
      <div>
        <label htmlFor="muscle">Partia mięśniowa</label>
        <select
          name="muscle"
          id="muscle"
          value={muscle}
          defaultValue="---"
          onChange={e => setMuscle(e.target.value)}
        >
          <option value="---" disabled>
            ---
          </option>
          {muscles.map((muscle, index) => (
            <option key={index} value={muscle}>
              {muscle}
            </option>
          ))}
        </select>
        <select
          name="practice"
          id="practice"
          value={practiceName}
          defaultValue="---"
          onChange={e => setPracticeName(e.target.value)}
        >
          <option value="---" disabled>
            ---
          </option>
          {practices.map((practice, index) => (
            <option key={index} value={practice}>
              {practice}
            </option>
          ))}
        </select>
      </div>
      {setsForms}
      <button type="button" onClick={handleAddSetForm}>
        Add new set
      </button>
    </React.Fragment>
  );

  // return (
  //   <>
  //     <div className="practice__name">
  //       <label htmlFor="muscle">Partia mięśniowa</label>
  //       <select
  //         name="muscle"
  //         id="muscle"
  //         value={muscle}
  //         onChange={e => setMuscle(e.target.value)}
  //       >
  //         <option style={{ display: "none" }} disabled selected value>
  //           {" "}
  //           -- select an option --{" "}
  //         </option>
  //         {muscles.map((muscle, index) => (
  //           <option key={index} value={muscle}>
  //             {muscle}
  //           </option>
  //         ))}
  //       </select>
  //       <label htmlFor="practice"></label>
  //       <select name="practice" id="practice">
  //         {practices.map((practice, index) => (
  //           <option key={index} value={practice}>
  //             {practice}
  //           </option>
  //         ))}
  //       </select>
  //     </div>
  //     <div className="practice__details">

  //     </div>
  //   </>
  // );
};

export default SinglePractice;
