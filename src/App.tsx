import React, { FC } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { IonApp } from "@ionic/react";
import "./styles";

import { AuthProvider } from "./context/auth";
import Tabs from "./components/Tabs";

const App: FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <AuthProvider>
          <Tabs />
        </AuthProvider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
