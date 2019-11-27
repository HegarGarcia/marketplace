import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import { PRODUCT } from "../../constants/routes";
import ProductList from "./ProductsList";
import ProductDetail from "./ProductDetail";

const Product = () => (
  <IonRouterOutlet>
    <Route path={PRODUCT} component={ProductList} exact={true} />
    <Route path={`${PRODUCT}/detail`} component={ProductDetail} exact={true} />
    <Route
      path={`${PRODUCT}/detail/:id`}
      component={ProductDetail}
      exact={true}
    />
  </IonRouterOutlet>
);

export default Product;
