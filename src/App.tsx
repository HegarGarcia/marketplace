import React from "react";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import "./styles";

import Router from "./components/Router";
import Tabs from "./components/Tabs";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Router />
      <Tabs />
    </IonReactRouter>
  </IonApp>
);

export default App;
