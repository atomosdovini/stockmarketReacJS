import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import NotFound from "./containers/notfound/NotFound";
import { useEffect } from "react";
import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from './actions/types';
import { isAuthenticated } from "./actions/auth";

export function PrivateRoute({ component:Component,...rest }) {

  return (
    <Route
      {...rest}
      render={(props) => {
      if 
      (isAuthenticated() == true)
      {       
        return <Component {...props} />;
      } else {
        window.location.assign("/");
      }
      }}
    />
  );
}

