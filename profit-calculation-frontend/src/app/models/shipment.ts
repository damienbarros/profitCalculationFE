export interface Customer {
  id?: number;
  name: string;
  paymentAmount: number;
}

export interface ServiceProvision {
  id?: number;
  description: string;
  costAmount: number;
}

export interface Shipment {
  id?: number;
  referenceNumber?: string;
  profitOrLoss?: number;
  customers?: Customer[];
  serviceProv?: ServiceProvision[];
}
