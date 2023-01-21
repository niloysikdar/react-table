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
  qtyShipped?: number;
  grQuantity?: number;
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
    notification: false,
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
  {
    id: 3,
    notification: true,
    vendor: 'Essel Propack',
    vendorCode: 357898,
    poId: 4504678765,
    poLine: 2,
    description: 'Label-Esilfo Trans 250',
    poValue: 450000,
    qtyOrdered: 450000,
    uom: 'EA',
    dueDate: '12/04/2020',
    committedDate: '12/04/2020',
    status: 'Accepted',
  },
  {
    id: 4,
    notification: true,
    vendor: 'Ghatotkach Packs',
    vendorCode: 334578,
    poId: 4507316759,
    poLine: 1,
    description: 'Corr Box 5 Ply 12.2x12.2x6.2',
    poValue: 270000,
    qtyOrdered: 300000,
    uom: 'EA',
    dueDate: '22/07/2020',
    committedDate: '22/07/2020',
    status: 'Review Req',
  },
  {
    id: 5,
    notification: false,
    vendor: 'APRO Films',
    vendorCode: 345631,
    poId: 4555125386,
    poLine: 1,
    description: 'PVC-PVDC 30 microns',
    poValue: 846000,
    qtyOrdered: 264000,
    qtyShipped: 264000,
    grQuantity: 264000,
    uom: 'KG',
    dueDate: '16/05/2020',
    committedDate: '16/05/2020',
    status: 'Dispatched',
  },
  {
    id: 6,
    notification: false,
    vendor: 'Essel Propack',
    vendorCode: 357898,
    poId: 4524563214,
    poLine: 1,
    description: 'Label-Esilfo Trans 250',
    poValue: 890000,
    qtyOrdered: 40000,
    qtyShipped: 40000,
    grQuantity: 40000,
    uom: 'EA',
    dueDate: '22/06/2020',
    committedDate: '22/06/2020',
    status: 'Review Req',
  },
  {
    id: 7,
    notification: true,
    vendor: 'Johnson Pet',
    vendorCode: 378432,
    poId: 4504456789,
    poLine: 1,
    description: 'PET Bottles 60 ML Amber',
    poValue: 770000,
    qtyOrdered: 1250000,
    uom: 'KG',
    dueDate: '30/06/2020',
    committedDate: '30/06/2020',
    status: 'Accepted',
  },
];
