import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent
} from "@ionic/react";

const Sells: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sell</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent />
    </IonPage>
  );
};

export default Sells;
