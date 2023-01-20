import type { OrderData } from '../data';

export type Filters = { status: string; supplier: string };

export function filterData(
  data: OrderData[],
  filters: Filters,
): OrderData[] | [] {
  const { status, supplier } = filters;
  if (status === 'All' && supplier === 'All') {
    return data;
  }
  if (status === 'All') {
    return data.filter((item) => item.vendor === supplier);
  }
  if (supplier === 'All') {
    return data.filter((item) => item.status === status);
  }
  return data.filter(
    (item) => item.status === status && item.vendor === supplier,
  );
}
