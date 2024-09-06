export interface OrderPayment {
  orderId: string;
  currency: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}
