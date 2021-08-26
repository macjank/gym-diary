import { useContext } from 'react';
import TrainingsContext from '../store/trainings-context';
import styles from './TrainingList.module.css'

const TrainingList = () => {
    const trainingsCtx = useContext(TrainingsContext);

    return (
        <div></div>
    );
}
 
export default TrainingList;