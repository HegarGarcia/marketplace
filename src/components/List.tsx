import React, { FC } from "react";
import { IonList } from "@ionic/react";
import ListItem from "./ListItem";

export interface Item {
  id?: string;
  photoUrl?: string;
  title: string;
  subtitle: string;
}

interface ListProps {
  items: Item[];
  rootPath: string;
}

const List: FC<ListProps> = ({ items, rootPath }) => {
  return (
    <IonList>
      {items.map(({ id, ...props }) => (
        <ListItem key={id} {...props} href={`${rootPath}/detail/${id}`} />
      ))}
    </IonList>
  );
};

export default List;
