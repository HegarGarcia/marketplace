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
        <PrivateRoute
          path={`${Routes.CLIENT}/detail`}
          component={Pages.ClientDetail}
          exact={true}
        />
        <PrivateRoute
          path={`${Routes.CLIENT}/detail/:id`}
          component={Pages.ClientDetail}
          exact={true}
        />
        <PrivateRoute path={Routes.CLIENT} component={Pages.ClientsList} />

        <PrivateRoute
          path={`${Routes.PRODUCT}/detail`}
          component={Pages.ProductDetail}
          exact={true}
        />
        <PrivateRoute
          path={`${Routes.PRODUCT}/detail/:id`}
          component={Pages.ProductDetail}
          exact={true}
        />
        <PrivateRoute path={Routes.PRODUCT} component={Pages.ProductsList} />

        <PrivateRoute
          path={`${Routes.SELL}/detail`}
          component={Pages.SellDetail}
          exact={true}
        />
        <PrivateRoute
          path={`${Routes.SELL}/detail/:id`}
          component={Pages.SellDetail}
          exact={true}
        />
        <PrivateRoute path={Routes.SELL} component={Pages.SellList} />
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
