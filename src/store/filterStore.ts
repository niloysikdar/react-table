import { create } from 'zustand';
import type { Dayjs } from 'dayjs';

export interface FilterBaseState {
  status: string;
  supplier: string;
  dateFrom: Dayjs | null;
  dateTo: Dayjs | null;
  searchTerm: string;
}

interface FilterState extends FilterBaseState {
  setStatus: (status: string) => void;
  setSupplier: (supplier: string) => void;
  setDateFrom: (dateFrom: Dayjs | null) => void;
  setDateTo: (dateTo: Dayjs | null) => void;
  setSearchTerm: (searchTerm: string) => void;
}

const useFilterStore = create<FilterState>()((set) => ({
  status: 'All',
  supplier: 'All',
  dateFrom: null,
  dateTo: null,
  searchTerm: '',
  setStatus: (status: string) => set({ status }),
  setSupplier: (supplier: string) => set({ supplier }),
  setDateFrom: (dateFrom: Dayjs | null) => set({ dateFrom }),
  setDateTo: (dateTo: Dayjs | null) => set({ dateTo }),
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
}));

export function getStatus() {
  return useFilterStore((state) => state.status);
}

export function getSupplier() {
  return useFilterStore((state) => state.supplier);
}

export function getDateFrom() {
  return useFilterStore((state) => state.dateFrom);
}

export function getDateTo() {
  return useFilterStore((state) => state.dateTo);
}

export function getSearchTerm() {
  return useFilterStore((state) => state.searchTerm);
}

export default useFilterStore;
