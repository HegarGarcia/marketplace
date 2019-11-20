import React, { FC } from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from "@ionic/react";
import { Route, Redirect } from "react-router";
import { person, pricetag, basket, stats } from "ionicons/icons";

import Client from "../pages/Clients";
import Product from "../pages/Product";
import Sell from "../pages/Sell";

const Tabs: FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route path='/client' component={Client} exact={true} />
      <Route path='/product' component={Product} exact={true} />
      <Route path='/sell' component={Sell} exect={true} />
      <Redirect path='/' to='/client' exact={true} />
    </IonRouterOutlet>

    <IonTabBar slot='bottom'>
      <IonTabButton tab='tab1' href='/client'>
        <IonIcon icon={person} />
        <IonLabel>Clients</IonLabel>
      </IonTabButton>

      <IonTabButton tab='tab2' href='/product'>
        <IonIcon icon={pricetag} />
        <IonLabel>Products</IonLabel>
      </IonTabButton>

      <IonTabButton tab='tab3' href='/sell'>
        <IonIcon icon={basket} />
        <IonLabel>Sells</IonLabel>
      </IonTabButton>

      <IonTabButton tab='tab4' href='/stats'>
        <IonIcon icon={stats} />
        <IonLabel>Reports</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default Tabs;
