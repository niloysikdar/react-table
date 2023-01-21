import type { OrderData } from '../data';

export function searchTable(data: OrderData[], search: string): OrderData[] {
  const searchTerm = search.trim().toLowerCase();

  if (searchTerm === '') return data;

  return data.filter(
    (row) =>
      row.vendor.toLowerCase().includes(searchTerm) ||
      row.vendorCode.toString().includes(searchTerm) ||
      row.description.toLowerCase().includes(searchTerm),
  );
}
