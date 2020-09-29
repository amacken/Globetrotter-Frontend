import React, { useState, useEffect, useContext } from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

import NavBar from "./components/NavBar/NavBar";
import CityList from "./components/CityList/CityList";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import LogInForm from "./components/LogInForm/LogInForm";
import LogOut from "./components/LogOut/LogOut";
import {UserContext} from "../src/context/Context"
import Map from "./components/Map/Map";
import './App.css';

require("dotenv").config();

export default function App(props) {
  // const [userState, dispatchUserState] = useContext(UserContext);
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

  const [signupInfo, updateSignupInfo] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loginInfo, updateLoginInfo] = useState({
    email: "",
    password: ""
  });

  const handleLoginChange = (event) => {
    updateLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
  };

  const handleSignupChange = (event) => {
    updateSignupInfo({
      ...signupInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/users/signup`, {
        name: signupInfo.name,
        email: signupInfo.email,
        password: signupInfo.password
      });
      localStorage.token = response.data.token;
      // console.log(response, userState);
      props.history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/users/login`, {
        email: loginInfo.email,
        password: loginInfo.password
      });
      localStorage.token = response.data.token;
      // console.log(response, userState);
      props.history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

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
