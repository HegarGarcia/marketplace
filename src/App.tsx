import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import { IonApp } from "@ionic/react";
import "./styles";

import Router from "./components/Router";

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Router />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
