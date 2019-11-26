import React, { FC } from "react";
import { Route, Redirect } from "react-router";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from "@ionic/react";
import { person, pricetag, basket, stats } from "ionicons/icons";

import * as Routes from "../constants/routes";
import PrivateRoute from "../components/PrivateRoute";
import {
  ClientList,
  ProductList,
  SellList,
  Stats,
  SignUp,
  SignIn
} from "../pages";

const Tabs: FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <PrivateRoute path={Routes.CLIENT} component={ClientList} />
      <PrivateRoute path={Routes.PRODUCT} component={ProductList} />
      <PrivateRoute path={Routes.SELL} component={SellList} />
      <PrivateRoute path={Routes.STATS} component={Stats} />

      <Route path={Routes.SIGNUP} component={SignUp} />
      <Route path={Routes.SIGNIN} component={SignIn} />

      <Redirect path={Routes.ROOT} to={Routes.CLIENT} exact={true} />
    </IonRouterOutlet>

    <IonTabBar slot='bottom'>
      <IonTabButton tab='tab1' href={Routes.CLIENT}>
        <IonIcon icon={person} />
        <IonLabel>Clients</IonLabel>
      </IonTabButton>

      <IonTabButton tab='tab2' href={Routes.PRODUCT}>
        <IonIcon icon={pricetag} />
        <IonLabel>Products</IonLabel>
      </IonTabButton>

      <IonTabButton tab='tab3' href={Routes.SELL}>
        <IonIcon icon={basket} />
        <IonLabel>Sells</IonLabel>
      </IonTabButton>

      <IonTabButton tab='tab4' href={Routes.STATS}>
        <IonIcon icon={stats} />
        <IonLabel>Reports</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default Tabs;
