import React from 'react';
//import logo from './logo.svg';
import './App.css';
import '@elastic/eui/dist/eui_theme_light.css';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomePage from './Home/HomePage';
import ProfilePage from './Home/ProfilePage';
import SignupPage from './Login/SignupPage';
import LoginPage from './Login/LoginPage';
class App extends React.Component {
    render(){
        return (
            <Router>
              <Switch>
                <Route path="/profile">
                  <ProfilePage />
                </Route>
                <Route path="/signup">
                    <SignupPage />
                </Route>
                <Route path="/home">
                    <HomePage />
                </Route>
                <Route exact path="/">
                  <LoginPage />
                </Route>

              </Switch>
            </Router>

        );
    }
}

export default App;