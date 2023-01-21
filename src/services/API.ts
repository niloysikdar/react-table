import { orderData } from '../data';
import type { OrderData } from '../data';

export function getOrders(): Promise<OrderData[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(orderData), 2000);
  });
}
