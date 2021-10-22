import { Route, Switch } from 'react-router';
import Layout from './components/UI/Layout';
import Home from './pages/Home';
import NewTraining from './pages/NewTraining';
import './styles/global.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTrainings, sendTrainings } from './store/trainingBase-actions';
import { getExercises, sendExercises } from './store/exerciseBase-actions';
import TrainingDetails from './components/Trainings/TrainingDetails';
import Exercises from './pages/Exercises';
import NotFound from './pages/NotFound';
import Trainings from './pages/Trainings';

let firstRunTrainings = true;
let firstRunExercises = true;

function App() {
  //importing state from redux slices
  const { trainings } = useSelector(state => state.trainingsBase);
  const { exercises } = useSelector(state => state.exercisesBase);

  const dispatch = useDispatch();

  //getting trainings from database at the first run
  useEffect(() => {
    dispatch(getTrainings());
    dispatch(getExercises());
  }, [dispatch]);

  //sending trainings to the db every time they change (except the first run)
  useEffect(() => {
    if (firstRunTrainings) {
      firstRunTrainings = false;
      return;
    }
    dispatch(sendTrainings(trainings));
  }, [trainings, dispatch]);

  useEffect(() => {
    if (firstRunExercises) {
      firstRunExercises = false;
      return;
    }
    dispatch(sendExercises(exercises));
  }, [exercises, dispatch]);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/trainings' exact> 
          <Trainings />
        </Route>
        <Route path='/new-training'>
          <NewTraining />
        </Route>
        <Route path='/trainings/:trainingId'>
          <TrainingDetails />
        </Route>
        <Route path='/exercises'>
          <Exercises />
        </Route>
        <Route path='/'>
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
