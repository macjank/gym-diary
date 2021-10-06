import React from 'react';
import Card from '../UI/Card';
import styles from '../../styles/Trainings/SingleTrainingPreview.module.scss';

const SingleTrainingPreview = ({ date, location }) => {
  return (
    <li className={styles.training}>
      <Card>
        <h2>{date}</h2>
        <h2>{location}</h2>
      </Card>
    </li>
  );
};

export default SingleTrainingPreview;
