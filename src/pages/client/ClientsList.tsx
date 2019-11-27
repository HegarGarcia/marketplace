import React, { FC, useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon
} from "@ionic/react";
import { add } from "ionicons/icons";

import { List, Header } from "../../components";
import { Item } from "../../components/List";
import { clientsCollection, Client } from "../../firebase";
import { CLIENT } from "../../constants/routes";

const Clients: FC = () => {
  const [clients, setClients] = useState<Item[]>([]);

  useEffect(() => {
    return clientsCollection.onSnapshot(snap => {
      const docs: Item[] = snap.docs.map(doc =>
        clientToItem({ id: doc.id, ...doc.data() } as Client)
      );
      setClients(docs);
    });
  }, []);

  return (
    <IonPage>
      <Header title='Clients' withBackButton={false} />

      <IonContent>
        <List items={clients} rootPath={CLIENT} />

        <IonFab vertical='bottom' horizontal='end'>
          <IonFabButton routerLink={`${CLIENT}/detail`}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

const clientToItem = ({ id, name, email }: Client): Item => ({
  id: id!,
  title: name,
  subtitle: email
});

export default Clients;
