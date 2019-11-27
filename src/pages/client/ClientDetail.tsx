import React, { FC, useReducer, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon
} from "@ionic/react";
import { checkmark, trash } from "ionicons/icons";
import { RouteComponentProps, useHistory } from "react-router";

import { Header } from "../../components";
import { clientsCollection, Client } from "../../firebase";

interface ClientDetailProps extends RouteComponentProps<{ id: string }> {}

const initialValue: Client = {
  email: "",
  name: "",
  phone: ""
};

const reducer = (state: Client, action: any): Client => {
  switch (action.type) {
    case "update_user":
      return { ...action.user };
    case "field":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const ClientDetail: FC<ClientDetailProps> = ({ match }) => {
  const { id } = match.params;
  const [client, dispatch] = useReducer(reducer, initialValue);
  const history = useHistory();

  useEffect(() => {
    if (id) {
      clientsCollection
        .doc(id)
        .get()
        .then(doc => dispatch({ type: "update_user", user: doc.data() }));
    }
  }, [id]);

  const updateField = (e: any) =>
    dispatch({ type: "field", field: e.target.name, value: e.target.value });

  const deleteClient = async () => {
    await clientsCollection.doc(id).delete();
    history.goBack();
  };

  const save = async () => {
    if (id) {
      await clientsCollection.doc(id).update(client);
    } else {
      await clientsCollection.add(client);
    }
    history.goBack();
  };

  return (
    <IonPage>
      <Header title='Client' withBackButton={true} withSignOut={false} />

      <IonContent>
        <form className='form'>
          <IonItem className='input'>
            <IonLabel position='floating'>Name</IonLabel>
            <IonInput
              name='name'
              value={client.name}
              onIonChange={updateField}
              type='text'
            />
          </IonItem>

          <IonItem className='input'>
            <IonLabel position='floating'>Email</IonLabel>
            <IonInput
              name='email'
              value={client.email}
              onIonChange={updateField}
              type='text'
            />
          </IonItem>

          <IonItem className='input'>
            <IonLabel position='floating'>Phone</IonLabel>
            <IonInput
              name='phone'
              value={client.phone}
              onIonChange={updateField}
              type='text'
            />
          </IonItem>

          {id && (
            <IonFab
              vertical='bottom'
              horizontal='start'
              slot='fixed'
              onClick={deleteClient}>
              <IonFabButton color='danger' type='submit'>
                <IonIcon icon={trash} />
              </IonFabButton>
            </IonFab>
          )}

          <IonFab vertical='bottom' horizontal='end' slot='fixed'>
            <IonFabButton onClick={save}>
              <IonIcon icon={checkmark} />
            </IonFabButton>
          </IonFab>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default ClientDetail;
