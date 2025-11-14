import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CustomerDto { id?: number; name: string; paymentAmount: number; }
export interface ServiceDto { id?: number; name: string; costAmount: number; }
export interface ShipmentDto {
  id?: number;
  referenceNumber?: string;
  customers?: CustomerDto[];
  serviceProv?: ServiceDto[];
  profitOrLoss?: number;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private _store = new BehaviorSubject<ShipmentDto[]>([
    // seed example rows shown in wireframe
    {
      id: 1,
      referenceNumber: 'shipment1',
      customers: [{ id: 1, name: 'customer1', paymentAmount: 1000 }, { id: 2, name: 'customer2', paymentAmount: 0 }],
      serviceProv: [{ id: 1, name: 'costs', costAmount: 200 }]
    },
    {
      id: 2,
      referenceNumber: 'shipment2',
      customers: [{ id: 3, name: 'c1', paymentAmount: 500 }],
      serviceProv: [{ id: 2, name: 'costs', costAmount: 900 }]
    }
  ]);

  get shipments$(): Observable<ShipmentDto[]> {
    return this._store.asObservable();
  }

  saveShipment(s: ShipmentDto) {
    const list = this._store.getValue();
    const nextId = list.length ? Math.max(...list.map(x => x.id || 0)) + 1 : 1;
    s.id = s.id ?? nextId;
    // compute profit
    const income = (s.customers || []).reduce((a, c) => a + (c.paymentAmount || 0), 0);
    const costs = (s.serviceProv || []).reduce((a, c) => a + (c.costAmount || 0), 0);
    s.profitOrLoss = +(income - costs).toFixed(2);

    this._store.next([s, ...list]);
  }
}
