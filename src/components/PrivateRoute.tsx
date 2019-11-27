import React, { useContext } from "react";
import { Route, Redirect } from "react-router";

import { SIGNIN } from "../constants/routes";
import { AuthContext } from "../context/auth";

interface PrivateRouteProps {
  component: any;
  path: string;
  exact?: boolean;
}

const PrivateRoute = ({
  component: Component,
  path,
  exact = false
}: PrivateRouteProps) => {
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const render = (props: any) =>
    isLoggedIn ? <Component {...props} /> : <Redirect to={SIGNIN} />;

  return <Route path={path} render={render} />;
};

export default PrivateRoute;
