//import { useContext } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Layout from './components/UI/Layout';
import Home from './pages/Home';
import NewTraining from './pages/NewTraining';
import { TrainingsContextProvider } from './store/trainings-context';
//import TrainingsContext from './store/trainings-context';

import './styles/global.scss';

function App() {
  return (
    <TrainingsContextProvider>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/new-training">
            <NewTraining />
          </Route>
        </Switch>
      </Layout>
    </TrainingsContextProvider>
  );
}

export default App;
