import React, { FC } from "react";
import { Route, Redirect, withRouter, RouteComponentProps } from "react-router";

import * as Routes from "../constants/routes";

import Tabs from "../components/Tabs";
import Clients from "../pages/ClientsList";
import Products from "../pages/ProductsList";
import Sells from "../pages/SellList";
import Stats from "../pages/Stats";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";

const Router: FC<RouteComponentProps> = props => {
  const currentRoute = props.location.pathname;
  const isAuthRoute =
    currentRoute === Routes.SIGNIN || currentRoute === Routes.SIGNUP;

  return (
    <>
      <Route path={Routes.CLIENT} component={Clients} exact={true} />
      <Route path={Routes.PRODUCT} component={Products} exact={true} />
      <Route path={Routes.SELL} component={Sells} exect={true} />
      <Route path={Routes.STATS} component={Stats} exect={true} />

      <Route path={Routes.SIGNUP} component={SignUp} exect={true} />
      <Route path={Routes.SIGNIN} component={SignIn} exect={true} />

      <Redirect path={Routes.ROOT} to={Routes.CLIENT} exact={true} />

      {!isAuthRoute && <Tabs />}
    </>
  );
};

export default withRouter(Router);
