import React from 'react';
import styles from '../../styles/Trainings/SingleTrainingPreview.module.scss';
import { Link } from 'react-router-dom';

const SingleTrainingPreview = ({ id, date, location }) => {
  return (
    <li className={styles.training}>
      <Link to={`/trainings/${id}`}>
        <h2 className={styles.training__date}>{date}</h2>
        <h2 className={styles.training__location}>{location}</h2>
      </Link>
    </li>
  );
};

export default SingleTrainingPreview;
