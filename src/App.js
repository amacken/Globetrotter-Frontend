import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
// import axios from "axios";

import NavBar from "./components/NavBar/NavBar";
import CityList from "./components/CityList/CityList";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import LogInForm from "./components/LogInForm/LogInForm";
import LogOut from "./components/LogOut/LogOut";
import Map from "./components/Map/Map";
import './App.css';

require("dotenv").config();

export default function App() {
  const [state, setState] = useState({
    email: "",
    password: "",
    isLoggedIn: false
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  const handleLogOut = () => {};

  const handleInput = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSignUp = (event) => {};

  const handleLogIn = (event) => {};

  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} />
      <Map/>
      <div className="body">
        <Router>
          <Switch>
            <Route
              path="/signup"
              render={(props) => {
                return (
                  <SignUpForm
                    isLoggedIn={isLoggedIn}
                    handleInput={handleInput}
                    handleSignUp={handleSignUp}
                  />
                );
              }}
            />
            <Route
              path="/logout"
              render={(props) => {
                return (
                  <LogOut isLoggedIn={isLoggedIn} handleLogOut={handleLogOut} />
                );
              }} 
            />
            <Route
              path="/login"
              render={(props) => {
                return (
                  <LogInForm
                    isLoggedIn={isLoggedIn}
                    handleInput={handleInput}
                    handleLogIn={handleLogIn} 
                  />
                );
              }} 
            />
            <Route
              path="/"
              render={() => {
                return <CityList isLoggedIn={isLoggedIn} />;
              }} 
            />
          </Switch>
        </Router>
      </div>
    </div>
  );
};
