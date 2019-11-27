import React, { FC, useContext } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonButton
} from "@ionic/react";
import { AuthContext } from "../context/auth";

interface HeaderProps {
  title: string;
  withBackButton: boolean;
  withSignOut?: boolean;
}

const Header: FC<HeaderProps> = ({
  title,
  withBackButton,
  withSignOut = true
}) => {
  const { signOut } = useContext(AuthContext);

  return (
    <IonHeader>
      <IonToolbar>
        {withBackButton && (
          <IonButtons slot='start'>
            <IonBackButton />
          </IonButtons>
        )}
        <IonTitle>{title}</IonTitle>
        {withSignOut && (
          <IonButtons slot='primary'>
            <IonButton onClick={signOut}>Log Out</IonButton>
          </IonButtons>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
