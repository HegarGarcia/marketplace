import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import { CLIENT } from "../../constants/routes";
import ClientList from "./ClientsList";
import ClientDetail from "./ClientDetail";

const Client = () => (
  <IonRouterOutlet>
    <Route path={CLIENT} component={ClientList} exact={true} />
    <Route path={`${CLIENT}/detail`} component={ClientDetail} exact={true} />
    <Route
      path={`${CLIENT}/detail/:id`}
      component={ClientDetail}
      exact={true}
    />
  </IonRouterOutlet>
);

export default Client;
