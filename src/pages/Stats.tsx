import React, { FC, useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonDatetime
} from "@ionic/react";
import { Header } from "../components";
import { sellsCollection, Sell } from "../firebase";

const average = (array: number[]) =>
  array.length &&
  array.reduce((a: number, b: number) => a + b, 0) / array.length;

const Stats: FC = () => {
  const [dailyEarnings, setDailyEarnings] = useState(0);
  const [monthlyEarnings, setMonthlyEarnings] = useState(0);
  const [yearlyEarnings, setYearlyEarnings] = useState(0);
  const [customEarnings, setCustomEarnings] = useState(0);
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const monthAgo = new Date();
    monthAgo.setMonth(today.getMonth() - 1);
    const yearAgo = new Date();
    yearAgo.setFullYear(today.getFullYear() - 1);

    const load = async () => {
      const daily = await Promise.all(
        await sellsCollection
          .where("timestamp", ">", yesterday)
          .get()
          .then(({ docs }) => docs.map(doc => (doc.data() as Sell).earnings))
      );

      const monthly = await Promise.all(
        await sellsCollection
          .where("timestamp", ">", monthAgo)
          .get()
          .then(({ docs }) => docs.map(doc => (doc.data() as Sell).earnings))
      );

      const yearly = await Promise.all(
        await sellsCollection
          .where("timestamp", ">", yearAgo)
          .get()
          .then(({ docs }) => docs.map(doc => (doc.data() as Sell).earnings))
      );

      setDailyEarnings(average(daily));
      setMonthlyEarnings(average(monthly));
      setYearlyEarnings(average(yearly));
    };

    load();
  }, []);

  useEffect(() => {
    const load = async () => {
      const custom = await Promise.all(
        await sellsCollection
          .where("timestamp", ">=", from)
          .where("timestamp", "<=", to)
          .get()
          .then(({ docs }) => docs.map(doc => (doc.data() as Sell).earnings))
      );
      setCustomEarnings(average(custom));
    };

    load();
  }, [from, to]);

  const onFromChange = ({ target }: any) => setFrom(new Date(target.value));
  const onToChange = ({ target }: any) => setTo(new Date(target.value));

  return (
    <IonPage>
      <Header title='Stats' withBackButton={false} withSignOut={true} />

      <IonContent>
        <IonList>
          <IonListHeader>Daily</IonListHeader>
          <IonItem>
            <IonLabel>Earnings: ${dailyEarnings}</IonLabel>
          </IonItem>

          <IonListHeader>Monthly</IonListHeader>
          <IonItem>
            <IonLabel>Earnings: ${monthlyEarnings}</IonLabel>
          </IonItem>

          <IonListHeader>Yearly</IonListHeader>
          <IonItem>
            <IonLabel>Earnings: ${yearlyEarnings}</IonLabel>
          </IonItem>

          <IonListHeader>Custom</IonListHeader>
          <IonItem>
            <IonLabel>From: </IonLabel>
            <IonDatetime value={from.toString()} onIonChange={onFromChange} />
          </IonItem>
          <IonItem>
            <IonLabel>To: </IonLabel>
            <IonDatetime value={to.toString()} onIonChange={onToChange} />
          </IonItem>
          <IonItem>
            <IonLabel>Earnings: ${customEarnings}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Stats;
