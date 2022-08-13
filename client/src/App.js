import './App.css';
import {Route, Switch} from 'react-router-dom'
import LandingPage from './Components/Landing/landing.js';
import Home from './Components/Home/home.js'
import Form from './Components/Form'
import Details from './Components/Details';


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
            <Route exact path = '/createpokemon' >
              <Form></Form>
            </Route>
            <Route exact path= '/details/:elID'>
              <Details></Details>
            </Route>

          </Switch>
        </div>
  );
}

export default App;
