export interface Sell {
  id?: string;
  product: firebase.firestore.DocumentReference;
  client: firebase.firestore.DocumentReference;
  amount: number;
  total: number;
}
