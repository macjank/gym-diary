import { Redirect, Route, Switch } from 'react-router';
import Layout from './components/UI/Layout';
import Home from './pages/Home';
import NewTraining from './pages/NewTraining';
import './styles/global.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TrainingDetails from './components/Trainings/TrainingDetails';
import Exercises from './pages/Exercises';
import NotFound from './pages/NotFound';
import Trainings from './pages/Trainings';
import EditTraining from './pages/EditTraining';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { projectAuth } from './firebase/config';
import { authActions } from './store/auth-slice';
import LoadingSpinner from './components/UI/LoadingSpinner';
import { trainingFormActions } from './store/trainingForm-slice';

function App() {
  const dispatch = useDispatch();
  const { user, isAuthReady } = useSelector(state => state.auth);

  //importing training form from local storage - if there is one
  useEffect(() => {
    const savedTrainingForm = localStorage.getItem('trainingForm');

    if (savedTrainingForm) {
      dispatch(trainingFormActions.replaceData(JSON.parse(savedTrainingForm)));
    }
  }, [dispatch]);

  //checking the authorization status after first run
  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(user => {
      if (user) {
        const dataToSave = {
          displayName: user.displayName,
          uid: user.uid,
        };
        dispatch(authActions.isAuthReady(dataToSave));
      } else {
        dispatch(authActions.isAuthReady(null));
      }
      unsub();
    });
  }, [dispatch]);

  return (
    <>
      {!isAuthReady && <LoadingSpinner />}
      {isAuthReady && (
        <Layout>
          <Switch>
            <Route path='/' exact>
              {user ? <Home /> : <Redirect to='/login' />}
            </Route>
            <Route path='/signup' exact>
              {user ? <Redirect to='/' /> : <Signup />}
            </Route>
            <Route path='/login' exact>
              {user ? <Redirect to='/' /> : <Login />}
            </Route>
            <Route path='/trainings' exact>
              {user ? <Trainings /> : <Redirect to='/login' />}
            </Route>
            <Route path='/new-training'>
              {user ? <NewTraining /> : <Redirect to='/login' />}
            </Route>
            {/* <Route path='/edit-training'>
              {user ? <EditTraining /> : <Redirect to='/login' />}
            </Route> */}
            <Route path='/trainings/:trainingId' exact>
              {user ? <TrainingDetails /> : <Redirect to='/login' />}
            </Route>
            <Route path='/trainings/:trainingId/edit'>
              {user ? <EditTraining /> : <Redirect to='/login' />}
            </Route>
            <Route path='/exercises'>
              {user ? <Exercises /> : <Redirect to='/login' />}
            </Route>
            <Route path='*'>
              {user ? <NotFound /> : <Redirect to='/login' />}
            </Route>
          </Switch>
        </Layout>
      )}
    </>
  );
}

export default App;
