import React, { FC, useContext } from "react";
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
import * as Pages from "../pages";

import PrivateRoute from "../components/PrivateRoute";
import { AuthContext } from "../context/auth";

const Tabs: FC = () => {
  const { user } = useContext(AuthContext);

  return !user ? (
    <IonRouterOutlet>
      <Route path={Routes.SIGNUP} component={Pages.SignUp} />
      <Route path={Routes.SIGNIN} component={Pages.SignIn} />

      <Redirect path='*' to={Routes.SIGNIN} exact={true} />
    </IonRouterOutlet>
  ) : (
    <IonTabs>
      <IonRouterOutlet>
        <PrivateRoute path={Routes.CLIENT} component={Pages.Client} />
        <PrivateRoute path={Routes.PRODUCT} component={Pages.Product} />
        <PrivateRoute path={Routes.SELL} component={Pages.Sell} />
        <PrivateRoute path={Routes.STATS} component={Pages.Stats} />

        <Redirect path='*' to={Routes.CLIENT} exact={true} />
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
};

export default Tabs;
