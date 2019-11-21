import React from "react";
import { Route, Redirect } from "react-router";

import * as Routes from "../constants/routes";

import Clients from "../pages/Clients";
import Products from "../pages/Products";
import Sells from "../pages/Sells";
import Stats from "../pages/Stats";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";

const Router = () => (
  <>
    <Route path={Routes.CLIENT} component={Clients} exact={true} />
    <Route path={Routes.PRODUCT} component={Products} exact={true} />
    <Route path={Routes.SELL} component={Sells} exect={true} />
    <Route path={Routes.STATS} component={Stats} exect={true} />

    <Route path={Routes.SIGNUP} component={SignUp} exect={true} />
    <Route path={Routes.SIGNIN} component={SignIn} exect={true} />

    <Redirect path={Routes.ROOT} to={Routes.CLIENT} exact={true} />
  </>
);

export default Router;
