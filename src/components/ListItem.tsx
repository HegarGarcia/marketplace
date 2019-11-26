import React, { FC } from "react";
import { IonItem, IonLabel, IonAvatar } from "@ionic/react";
import { Item } from "./List";

interface ListItemProps {
  onClick: (id: string) => void;
}

const ListItem: FC<ListItemProps & Item> = ({
  id,
  photoUrl,
  title,
  subtitle,
  onClick
}) => {
  const onClickHandler = () => onClick(id);

  return (
    <div onClick={onClickHandler}>
      <IonItem button={true}>
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
    </div>
  );
};

export default ListItem;
