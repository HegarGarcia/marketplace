import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon
} from "@ionic/react";
import { add } from "ionicons/icons";
import List, { Item } from "../../components/List";
import { productsCollection } from "../../firebase";
import { Product } from "../../firebase/product.interface";
import Header from "../../components/Header";
import { PRODUCT } from "../../constants/routes";

const ProductList: React.FC = () => {
  const [clients, setClients] = useState<Item[]>([]);

  useEffect(() => {
    return productsCollection.onSnapshot(snap => {
      const docs: Item[] = snap.docs.map(doc =>
        productToItem({ id: doc.id, ...doc.data() } as Product)
      );
      setClients(docs);
    });
  }, []);

  return (
    <IonPage>
      <Header title='Product' withBackButton={false} />

      <IonContent>
        <List items={clients} rootPath={PRODUCT} />

        <IonFab vertical='bottom' horizontal='end'>
          <IonFabButton routerLink={`${PRODUCT}/detail`}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

const productToItem = ({
  description,
  price,
  photoUrl,
  id
}: Product): Item => ({
  id: id!,
  title: description,
  subtitle: `$${price}`,
  photoUrl
});

export default ProductList;
