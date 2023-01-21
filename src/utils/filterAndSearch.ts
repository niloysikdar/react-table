import {
  getStatus,
  getSupplier,
  getDateFrom,
  getDateTo,
  getSearchTerm,
} from '../store/filterStore';
import type { OrderData } from '../data';
import { filterData, filterDataByDate } from './filterUtils';
import { searchTable } from './search';

export function filterAndSearch(data: OrderData[]): OrderData[] {
  const status = getStatus();
  const supplier = getSupplier();

  const dateFrom = getDateFrom();
  const dateFromStr = dateFrom?.format('DD/MM/YYYY') || '';
  const dateTo = getDateTo();
  const dateToStr = dateTo?.format('DD/MM/YYYY') || '';

  const searchTerm = getSearchTerm();

  const filteredData = filterData(data, { status, supplier });
  const filteredDataByDate = filterDataByDate(
    filteredData,
    dateFromStr,
    dateToStr,
  );

  return searchTable(filteredDataByDate, searchTerm);
}
