import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import { SELL } from "../../constants/routes";
import SellList from "./SellList";
import SellDetail from "./SellDetail";

const Sell = () => (
  <IonRouterOutlet>
    <Route path={SELL} component={SellList} exact={true} />
    <Route path={`${SELL}/detail`} component={SellDetail} exact={true} />
    <Route path={`${SELL}/detail/:id`} component={SellDetail} exact={true} />
  </IonRouterOutlet>
);

export default Sell;
