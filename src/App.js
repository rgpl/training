import React from 'react';
//import logo from './logo.svg';
import './App.css';
import '@elastic/eui/dist/eui_theme_light.css';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Homepage from './Home/Homepage';
import Profilepage from './Home/Profilepage';

class App extends React.Component {
    render(){
        return (
            <Router>
              <Switch>
                <Route path="/profile">
                  <Profilepage />
                </Route>
                <Route exact path="/">
                  <Homepage />
                </Route>

              </Switch>
            </Router>

        );
    }
}

export default App;