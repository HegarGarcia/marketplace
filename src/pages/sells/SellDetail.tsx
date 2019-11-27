import React, { FC, useReducer, useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonAlert
} from "@ionic/react";
import { checkmark, trash } from "ionicons/icons";
import { RouteComponentProps, useHistory } from "react-router";

import { Header } from "../../components";
import {
  sellsCollection,
  Sell,
  Product,
  Client,
  productsCollection,
  clientsCollection
} from "../../firebase";

interface ClientDetailProps extends RouteComponentProps<{ id: string }> {}

const initialValue = {
  amount: 0,
  client: "",
  product: "",
  total: 0.0
};

type CapturableSell = typeof initialValue;

const reducer = (state: CapturableSell, action: any): CapturableSell => {
  switch (action.type) {
    case "update_sell":
      return { ...action.sell };
    case "field":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const SellDetail: FC<ClientDetailProps> = ({ match }) => {
  const { id } = match.params;
  const [sell, dispatch] = useReducer(reducer, initialValue);
  const [products, setProducs] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      const productsDocs = await Promise.all(
        await productsCollection
          .where("amount", ">", 0)
          .get()
          .then(({ docs }) =>
            docs.map(doc => ({ id: doc.id, ...doc.data() } as Product))
          )
      );

      const clientsDocs = await Promise.all(
        await clientsCollection
          .get()
          .then(({ docs }) =>
            docs.map(doc => ({ id: doc.id, ...doc.data() } as Client))
          )
      );

      setProducs(productsDocs);
      setClients(clientsDocs);
    };

    load();
  }, []);

  useEffect(() => {
    if (id) {
      const getSell = async () => {
        const sellDoc = await sellsCollection
          .doc(id)
          .get()
          .then(doc => doc.data() as Sell);
        const productId = sellDoc.product.id;
        const clientId = sellDoc.client.id;

        dispatch({
          type: "update_sell",
          sell: { ...sellDoc, product: productId, client: clientId }
        });
      };

      getSell();
    }
  }, [id]);

  useEffect(() => {
    if (!id && sell.product) {
      const product = products.find(({ id }) => id === sell.product)!;
      const total = product.price * sell.amount;
      dispatch({
        type: "field",
        field: "total",
        value: total
      });
    }
  }, [sell.product, sell.amount, id, products]);

  const history = useHistory();

  const getCurrentProduct = () =>
    products.find(({ id }) => id === sell.product)!;

  const updateField = ({ target }: any) => {
    dispatch({
      type: "field",
      field: target.name,
      value: target.type === "number" ? +target.value : target.value
    });
  };

  const deleteProduct = async () => {
    await sellsCollection.doc(id).delete();
    history.goBack();
  };

  const save = async () => {
    const product = getCurrentProduct();

    if (sell.client === "") {
      setError("Please select a client");
      return;
    } else if (sell.product === "") {
      setError("Please select a product");
      return;
    } else if (sell.amount <= 0) {
      setError("Amount must be greater than 0");
      return;
    } else if (product.amount < sell.amount) {
      setError("Not enough inventory");
      return;
    }

    const productDoc = productsCollection.doc(sell.product);
    await productDoc.update({
      ...product,
      amount: product.amount - sell.amount
    });

    const validSell = {
      ...sell,
      client: clientsCollection.doc(sell.client),
      product: productDoc,
      total: sell.amount * product.price
    };

    if (id) {
      await sellsCollection.doc(id).update(validSell);
    } else {
      await sellsCollection.add(validSell);
    }
    history.goBack();
  };

  const compareWith = (o1: any, o2: any) => {
    return o1 && o2 ? o1 === o2 : false;
  };

  const cleanError = () => setError("");

  return (
    <IonPage>
      <Header title='Sell' withBackButton={true} withSignOut={false} />

      <IonContent>
        <form className='form'>
          <IonItem className='input'>
            <IonLabel>Client</IonLabel>
            <IonSelect
              placeholder='Client'
              name='client'
              onIonChange={updateField}
              value={sell.client}
              compareWith={compareWith}>
              {clients.map(({ id, name }) => (
                <IonSelectOption key={id} value={id}>
                  {name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem className='input'>
            <IonLabel>Product</IonLabel>
            <IonSelect
              placeholder='Product'
              name='product'
              onIonChange={updateField}
              value={sell.product}
              compareWith={compareWith}>
              {products.map(({ id, description }) => (
                <IonSelectOption key={id} value={id}>
                  {description}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem className='input'>
            <IonLabel position='floating'>Amount</IonLabel>
            <IonInput
              name='amount'
              value={sell.amount.toString()}
              onIonChange={updateField}
              type='number'
              required={true}
              inputMode='numeric'
              min='1'
            />
          </IonItem>

          <IonItem>
            <IonLabel position='floating'>Total</IonLabel>
            <IonInput value={sell.total.toString()} disabled={true} />
          </IonItem>
        </form>

        <IonAlert
          header='Error'
          message={error}
          isOpen={!!error}
          onDidDismiss={cleanError}
        />

        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonFabButton onClick={save}>
            <IonIcon icon={checkmark} />
          </IonFabButton>
        </IonFab>

        {id && (
          <IonFab
            vertical='bottom'
            horizontal='start'
            slot='fixed'
            onClick={deleteProduct}>
            <IonFabButton color='danger' type='submit'>
              <IonIcon icon={trash} />
            </IonFabButton>
          </IonFab>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SellDetail;
