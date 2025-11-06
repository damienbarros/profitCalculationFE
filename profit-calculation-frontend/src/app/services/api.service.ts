import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Shipment } from '../models/shipment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private base = 'http://localhost:8080/api/system';

  constructor(private http: HttpClient) {}

  calculate(shipment: Shipment): Observable<Shipment> {
    return this.http.post<Shipment>(`${this.base}/calculate`, shipment);
  }

  getShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(`${this.base}/shipments`);
  }

  getShipment(id: number) {
    return this.http.get<Shipment>(`${this.base}/${id}`);
  }
}
