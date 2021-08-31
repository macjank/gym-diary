import { useEffect, useState } from "react";

const NewSet = ({id, onAddNewSet}) => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  useEffect(() => {
    onAddNewSet(id, weight, reps);
  }, [id, weight, reps]);

  return (
    <div>
      <label htmlFor="weight">Ciężar</label>
      <input
        type="number"
        name="weight"
        id="weight"
        placeholder="Enter weight"
        value={weight}
        onChange={e => setWeight(e.target.value)}
      />
      <label htmlFor="reps">Powtórzenia</label>
      <input
        type="number"
        name="reps"
        id="reps"
        placeholder="Enter reps"
        value={reps}
        onChange={e => setReps(e.target.value)}
      />
    </div>
  );
};

export default NewSet;
