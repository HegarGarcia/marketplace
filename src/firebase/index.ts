import config from "./config.json";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp(config);
const firestore = firebase.firestore();

export const clientsCollection = firestore.collection("clients");
export const productsCollection = firestore.collection("products");
export const sellsCollection = firestore.collection("sells");

export const auth = firebase.auth();
