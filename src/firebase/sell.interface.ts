export interface Sell {
  id?: string;
  product: firebase.firestore.DocumentReference;
  client: firebase.firestore.DocumentReference;
  timestamp: Date;
  amount: number;
  total: number;
  earnings: number;
}
