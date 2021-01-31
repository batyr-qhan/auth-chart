import React from 'react';
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Home from "../Pages/Home/Home";
import Donut from "../Pages/Donut/Donut";
import {Route, Switch} from "react-router-dom";
import Login from "../Pages/Login/Login";

function Routes({isAuthed}) {
  return (
    <>
      <Switch>
        <PrivateRoute exact path="/" component={Home} isAuthed={isAuthed}/>
        <PrivateRoute exact path="/donut" component={Donut} isAuthed={isAuthed}/>
        <Route path="/login" component={Login}/>
      </Switch>
    </>
  );
}

export default Routes;