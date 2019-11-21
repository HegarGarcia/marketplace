import React, { FC } from "react";
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

const Tabs: FC = () => (
  <IonTabs>
    <IonRouterOutlet />

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
