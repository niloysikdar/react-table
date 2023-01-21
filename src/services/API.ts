import { orderData } from '../data';
import type { OrderData } from '../data';

export function fetchOrders(): Promise<OrderData[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(orderData), 2000);
  });
}
