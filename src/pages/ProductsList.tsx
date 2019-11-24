import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";

const Products: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Product</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent />
    </IonPage>
  );
};

export default Products;
