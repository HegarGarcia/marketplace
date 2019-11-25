import React, { FC } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { IonApp } from "@ionic/react";
import "./styles";

import Router from "./components/Router";
import { AuthProvider } from "./context/auth";

const App: FC = () => {
  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          <Router />
        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
};

export default App;
