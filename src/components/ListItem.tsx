import React, { FC } from "react";
import { IonItem, IonLabel, IonAvatar } from "@ionic/react";
import { Item } from "./List";

interface ListItemProps extends Item {
  href: string;
}

const ListItem: FC<ListItemProps> = ({ photoUrl, title, subtitle, href }) => {
  return (
    <IonItem button={true} routerLink={href}>
      {photoUrl && (
        <IonAvatar slot='start'>
          <img src={photoUrl} alt='Profile' />
        </IonAvatar>
      )}
      <IonLabel>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </IonLabel>
    </IonItem>
  );
};

export default ListItem;
