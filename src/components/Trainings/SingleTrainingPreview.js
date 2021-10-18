import React from 'react';
import Card from '../UI/Card';
import styles from '../../styles/Trainings/SingleTrainingPreview.module.scss';
import { Link } from 'react-router-dom';

const SingleTrainingPreview = ({ id, date, location }) => {
  return (
    <li className={styles.training}>
      <Link to={`/trainings/${id}`}>
        <Card>
          <h2>{date}</h2>
          <h2>{location}</h2>
        </Card>
      </Link>
    </li>
  );
};

export default SingleTrainingPreview;
