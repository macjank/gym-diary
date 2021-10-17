import { Route, Switch } from 'react-router';
import './App.css';
import Layout from './components/UI/Layout';
import Home from './pages/Home';
import NewTraining from './pages/NewTraining';
import './styles/global.scss';
import { useDispatch } from 'react-redux';
import { exercisesBaseActions } from './store/exercisesBase-slice';
import { useCallback, useEffect } from 'react/cjs/react.development';
import { trainingsBaseActions } from './store/trainingsBase-slice';

const exercisesBaseURL =
  'https://gym-diary-7ff93-default-rtdb.firebaseio.com/exerciseBase.json';

const trainingsURL =
  'https://gym-diary-7ff93-default-rtdb.firebaseio.com/trainings.json';

function App() {
  const dispatch = useDispatch();

  const getExercisesBase = useCallback(async () => {
    try {
      const response = await fetch(exercisesBaseURL);

      if (!response.ok) {
        throw Error('something went wrong. cannot load exercise base');
      }

      const data = await response.json();
      //setExerciseBase(data);
      dispatch(exercisesBaseActions.replaceExercisesBase(data));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const getTrainingsBase = useCallback(async () => {
    try {
      const response = await fetch(trainingsURL);

      if (!response.ok) {
        throw new Error('Could not fetch data');
      }

      const data = await response.json();

      const loadedTrainings = [];

      for (const key in data) {
        const singleTraining = {
          id: key,
          date: data[key].date,
          location: data[key].location,
          exercises: data[key].exercises,
        };
        loadedTrainings.push(singleTraining);
      }

      console.log(loadedTrainings);

      //setTrainings(loadedTrainings);
      dispatch(trainingsBaseActions.replaceTrainingsBase(loadedTrainings));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getExercisesBase();
    getTrainingsBase();
  }, [getExercisesBase, getTrainingsBase]);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/new-training'>
          <NewTraining />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
