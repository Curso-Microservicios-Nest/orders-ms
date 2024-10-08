import { OrderStatus } from '@prisma/client';

export interface OrderWithProducts {
  OrderItem: {
    product: string;
    quantity: number;
    productId: number;
    price: number;
  }[];
  id: string;
  totalAmount: number;
  totalItems: number;
  status: OrderStatus;
  paid: boolean;
  createdAt: Date;
  updatedAt: Date;
}
