import React from 'react';
import styles from '../../styles/Trainings/ExerciseDetails.module.scss';

const ExerciseDetails = ({ id, exerciseName, musclePart, sets }) => {
  const setsInfo = sets.map((set, index) => {
    const { reps, weight } = set;

    return (
      <div key={index} className={styles.exercise__set__singleSet}>
        <div>{index + 1}</div>
        <div>{weight}</div>
        <div>{reps}</div>
      </div>
    );
  });

  return (
    <li className={styles.exercise}>
      <h4 className={styles.exercise__name}>{exerciseName}</h4>
      <h4 className={styles.exercise__muscle}>{musclePart}</h4>
      <div className={styles.exercise__set}>
        <div className={styles.exercise__set__legend}>
          <div>Set</div>
          <div>Weight</div>
          <div>Reps</div>
        </div>
        {setsInfo}
      </div>
    </li>
  );
};

export default ExerciseDetails;
