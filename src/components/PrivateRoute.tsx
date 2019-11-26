import React, { useContext } from "react";
import { Route, Redirect } from "react-router";

import { SIGNIN } from "../constants/routes";
import { AuthContext } from "../context/auth";

interface PrivateRouteProps {
  component: any;
  path: string;
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const render = (props: any) =>
    isLoggedIn ? <Component {...props} /> : <Redirect to={SIGNIN} />;

  return <Route {...rest} render={render} exact={true} />;
};

export default PrivateRoute;
