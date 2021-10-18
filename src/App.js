import { Route, Switch } from 'react-router';
import './App.css';
import Layout from './components/UI/Layout';
import Home from './pages/Home';
import NewTraining from './pages/NewTraining';
import './styles/global.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTrainings, sendTrainings } from './store/trainingBase-actions';
import { getExercises } from './store/exerciseBase-actions';
import TrainingDetails from './components/Trainings/TrainingDetails';

let firstRun = true;

function App() {
  const { trainings } = useSelector(state => state.trainingsBase);
  const dispatch = useDispatch();

  //getting trainings from database at the first run
  useEffect(() => {
    dispatch(getTrainings());
    dispatch(getExercises());
  }, [dispatch]);

  //sending trainings to the db every times they change (except the first run)
  useEffect(() => {
    if (firstRun) {
      firstRun = false;
      return;
    }
    dispatch(sendTrainings(trainings));
  }, [trainings, dispatch]);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/new-training'>
          <NewTraining />
        </Route>
        <Route path='/trainings/:trainingId'>
          <TrainingDetails />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
