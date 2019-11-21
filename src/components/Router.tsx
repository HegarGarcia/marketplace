import React from "react";
import { Route, Redirect } from "react-router";

import * as Routes from "../constants/routes";

import Clients from "../pages/Clients";
import Products from "../pages/Product";
import Sells from "../pages/Sell";

const Router = () => (
  <>
    <Route path={Routes.CLIENT} component={Clients} exact={true} />
    <Route path={Routes.PRODUCT} component={Products} exact={true} />
    <Route path={Routes.SELL} component={Sells} exect={true} />
    <Redirect path={Routes.ROOT} to={Routes.CLIENT} exact={true} />
  </>
);

export default Router;
