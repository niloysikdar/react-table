export type OrderData = {
  id: number;
  notification: boolean;
  vendor: string;
  vendorCode: number;
  poId: number;
  poLine: number;
  description: string;
  poValue: number;
  qtyOrdered: number;
  qtyShipped: number;
  grQuantity: number;
  uom: 'EA' | 'KG';
  dueDate: string;
  committedDate: string;
  status:
    | 'GRN Posted'
    | 'Accepted'
    | 'Review Req'
    | 'Dispatched'
    | 'Rejected'
    | 'Open';
};

export const orderData: OrderData[] = [
  {
    id: 1,
    notification: false,
    vendor: 'Allen Packs',
    vendorCode: 321345,
    poId: 4504567863,
    poLine: 1,
    description: 'Carton - Azithro 3x10 300 GSM FBB',
    poValue: 350000,
    qtyOrdered: 300000,
    qtyShipped: 300000,
    grQuantity: 300000,
    uom: 'EA',
    dueDate: '15/03/2020',
    committedDate: '15/03/2020',
    status: 'GRN Posted',
  },
  {
    id: 2,
    notification: true,
    vendor: 'Ghatotkach Packs',
    vendorCode: 334578,
    poId: 4504356789,
    poLine: 1,
    description: 'Corr Box 5 Ply 12.2x12.2x6.2',
    poValue: 900000,
    qtyOrdered: 50000,
    qtyShipped: 50000,
    grQuantity: 50000,
    uom: 'EA',
    dueDate: '21/03/2020',
    committedDate: '21/03/2020',
    status: 'GRN Posted',
  },
];
