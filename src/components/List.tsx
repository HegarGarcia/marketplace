import React, { FC } from "react";
import { IonList } from "@ionic/react";
import ListItem from "./ListItem";

export interface Item {
  id: string;
  photoUrl?: string;
  title: string;
  subtitle: string;
}

interface ListProps {
  items: Item[];
  onItemClick: (id: string) => void;
}

const List: FC<ListProps> = ({ items, onItemClick }) => {
  return (
    <IonList>
      {items.map(props => (
        <ListItem key={props.id} {...props} onClick={onItemClick} />
      ))}
    </IonList>
  );
};

export default List;
