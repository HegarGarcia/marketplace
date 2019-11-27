export interface Sell {
  product: firebase.firestore.DocumentReference;
  client: firebase.firestore.DocumentReference;
  amount: number;
  total: number;
}
