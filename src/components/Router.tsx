import React, { FC } from "react";
import { Route, Redirect, withRouter, RouteComponentProps } from "react-router";

import * as Routes from "../constants/routes";
import PrivateRoute from "../components/PrivateRoute";

import Tabs from "../components/Tabs";
import {
  ClientList,
  ProductList,
  SellList,
  Stats,
  SignUp,
  SignIn
} from "../pages";

const Router: FC<RouteComponentProps> = props => {
  const currentRoute = props.location.pathname;
  const isAuthRoute =
    currentRoute === Routes.SIGNIN || currentRoute === Routes.SIGNUP;

  return (
    <>
      <PrivateRoute path={Routes.CLIENT} component={ClientList} />
      <PrivateRoute path={Routes.PRODUCT} component={ProductList} />
      <PrivateRoute path={Routes.SELL} component={SellList} />
      <PrivateRoute path={Routes.STATS} component={Stats} />

      <Route path={Routes.SIGNUP} component={SignUp} />
      <Route path={Routes.SIGNIN} component={SignIn} />

      <Redirect path={Routes.ROOT} to={Routes.CLIENT} exact={true} />

      {!isAuthRoute && <Tabs />}
    </>
  );
};

export default withRouter(Router);
