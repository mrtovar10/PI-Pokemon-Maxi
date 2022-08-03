import './App.css';
import {Route, Switch} from 'react-router-dom'
import LandingPage from './Components/Landing/landing.js';
import Home from './Components/Home/home.js'


function App() {
  return (
        <div className="App">
          <Switch>
            <Route exact path = '/'>
              <LandingPage/>
            </Route>
            <Route exact path = '/home'>
              <Home/>
            </Route>
          </Switch>
        </div>
  );
}

export default App;
