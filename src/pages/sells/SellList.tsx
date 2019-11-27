import React, { FC, useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon
} from "@ionic/react";
import { add } from "ionicons/icons";
import List, { Item } from "../../components/List";
import { sellsCollection, Product, productsCollection } from "../../firebase";
import { Sell } from "../../firebase";
import Header from "../../components/Header";
import { SELL } from "../../constants/routes";

const SellsList: FC = () => {
  const [sells, setSells] = useState<Item[]>([]);

  useEffect(() => {
    sellsCollection.onSnapshot(async ({ docs }) => {
      const items = await Promise.all(
        docs.map(async doc => {
          const sell = {
            id: doc.id,
            ...(doc.data() as Sell)
          };

          const product = await productsCollection
            .doc(sell.product)
            .get()
            .then(productDoc => productDoc.data() as Product);

          return sellToItem({ ...sell, product });
        })
      );

      setSells(items);
    });
  }, []);

  return (
    <IonPage>
      <Header title='Sell' withBackButton={false} />

      <IonContent>
        <List items={sells} rootPath={SELL} />

        <IonFab vertical='bottom' horizontal='end'>
          <IonFabButton routerLink={`${SELL}/detail`}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

interface SellWithProduct {
  id?: string;
  product: Product;
  amount: number;
  total: number;
}

const sellToItem = ({ id, product, total }: SellWithProduct): Item => ({
  id: id!,
  title: (product as Product).description,
  subtitle: `$${total}`,
  photoUrl: (product as Product).photoUrl
});

export default SellsList;
