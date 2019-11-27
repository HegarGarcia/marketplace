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
import { productsCollection, Product } from "../../firebase";
import "./styles.css";

interface ClientDetailProps extends RouteComponentProps<{ id: string }> {}

const initialValue: Product = {
  amount: 0,
  cost: 0.0,
  description: "",
  photoUrl: "",
  price: 0.0
};

const reducer = (state: Product, action: any): Product => {
  switch (action.type) {
    case "update_product":
      return { ...action.product };
    case "field":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const ProductDetail: FC<ClientDetailProps> = ({ match }) => {
  const { id } = match.params;
  const [product, dispatch] = useReducer(reducer, initialValue);
  const history = useHistory();

  useEffect(() => {
    if (id) {
      productsCollection
        .doc(id)
        .get()
        .then(doc => dispatch({ type: "update_product", product: doc.data() }));
    }
  }, [id]);

  const updateField = ({ target }: any) =>
    dispatch({
      type: "field",
      field: target.name,
      value: target.type === "number" ? +target.value : target.value
    });

  const deleteProduct = async () => {
    await productsCollection.doc(id).delete();
    history.goBack();
  };

  const save = async () => {
    if (id) {
      await productsCollection.doc(id).update(product);
    } else {
      await productsCollection.add(product);
    }
    history.goBack();
  };

  return (
    <IonPage>
      <Header title='Product' withBackButton={true} withSignOut={false} />

      <IonContent>
        <form className='form'>
          <IonItem className='input'>
            <IonLabel position='floating'>Description</IonLabel>
            <IonInput
              name='description'
              value={product.description}
              onIonChange={updateField}
              type='text'
            />
          </IonItem>

          <IonItem className='input'>
            <IonLabel position='floating'>Amount</IonLabel>
            <IonInput
              name='amount'
              value={product.amount.toString()}
              onIonChange={updateField}
              type='number'
              pattern='[0-9]*'
              inputMode='numeric'
              min='1'
            />
          </IonItem>

          <IonItem className='input'>
            <IonLabel position='floating'>Cost</IonLabel>
            <IonInput
              name='cost'
              value={product.cost.toString()}
              onIonChange={updateField}
              type='number'
              inputMode='numeric'
            />
          </IonItem>

          <IonItem className='input'>
            <IonLabel position='floating'>Price</IonLabel>
            <IonInput
              name='price'
              value={product.price.toString()}
              onIonChange={updateField}
              type='number'
              inputMode='numeric'
            />
          </IonItem>

          <IonItem className='input'>
            <IonLabel position='floating'>Photo</IonLabel>
            <IonInput
              name='photoUrl'
              value={product.photoUrl}
              onIonChange={updateField}
              type='url'
            />
          </IonItem>
        </form>

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

        <IonFab vertical='bottom' horizontal='end' slot='fixed'>
          <IonFabButton onClick={save}>
            <IonIcon icon={checkmark} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ProductDetail;
