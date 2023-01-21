import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '../services/API';

export function useOrderData() {
  return useQuery({
    queryKey: ['orderData'],
    queryFn: () => fetchOrders().then((res) => res),
  });
}
