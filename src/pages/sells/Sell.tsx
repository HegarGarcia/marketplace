import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import { SELL } from "../../constants/routes";
import SellList from "./SellList";

const Product = () => (
  <IonRouterOutlet>
    <Route path={SELL} component={SellList} />
  </IonRouterOutlet>
);

export default Product;
