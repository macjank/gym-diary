import React from 'react';
import styles from '../../styles/Trainings/ExerciseDetails.module.scss';

const ExerciseDetails = ({ exerciseName, musclePart, sets }) => {
  const totalWeight = sets.reduce((acc, curr) => {
    const weightInSet = curr.weight * curr.reps;
    return acc + weightInSet;
  }, 0);

  const allWeights = sets.map(set => set.weight);
  const maxWeight = Math.max(...allWeights);

  const setsInfo = sets.map((set, index) => {
    const { reps, weight } = set;

    return (
      <div key={index} className={styles.exercise__details__set}>
        <div className={styles.exercise__details__set__number}>{index + 1}</div>
        <div>{reps}</div>
        <div>{weight}</div>
      </div>
    );
  });

  return (
    <li className={styles.exercise}>
      <h2 className={styles.exercise__name}>{exerciseName}</h2>
      <h4 className={styles.exercise__muscle}>{musclePart}</h4>
      <div className={styles.exercise__details}>
        <div className={styles.exercise__details__legend}>
          <div>Set</div>
          <div>Reps</div>
          <div>Weight</div>
        </div>
        {setsInfo}
      </div>
      <div className={styles.exercise__summary}>
        <div className={styles.exercise__summary__totalWeight}>
          <h4>Total weight</h4>
          <p>{totalWeight} kg</p>
        </div>
        <div className={styles.exercise__summary__maxWeight}>
          <h4>Max weight</h4>
          <p>{maxWeight} kg</p>
        </div>
      </div>
    </li>
  );
};

export default ExerciseDetails;
