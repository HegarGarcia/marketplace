import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import List, { Item } from "../../components/List";
import { clientsCollection } from "../../firebase";

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Item[]>([]);

  useEffect(() => {
    return clientsCollection.onSnapshot(snap => {
      const docs: Item[] = snap.docs.map(doc => {
        const { name, email } = doc.data();
        return { id: doc.id, title: name, subtitle: email };
      });

      setClients(docs);
    });
  }, []);

  const onItemClick = (id: string) => {
    console.log(id);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Clients</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <List items={clients} onItemClick={onItemClick} />
      </IonContent>
    </IonPage>
  );
};

export default Clients;
