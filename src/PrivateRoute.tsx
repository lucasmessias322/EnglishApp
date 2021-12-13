import React, { useContext } from 'react';
import { Redirect, Route } from "react-router-dom";
import {AppContext} from './Context/Store'

const PrivateRoute = ({ component: Component, ...rest }:any) => {
    const {token} = useContext(AppContext);

    return (
      <Route
        {...rest}
        render={(props) =>
          token ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        }
      />
    );
  };

  export default PrivateRoute