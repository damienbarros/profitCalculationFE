import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class ProfitService {
  private apiUrl = 'http://localhost:8080/api/shipments';

  constructor(private http: HttpClient) {}

  updateProfit(shipmentNumber: string, profitOrLoss: number) {
    return this.http.put(`${this.apiUrl}/${shipmentNumber}/profit`, {
      profitOrLoss
    });
  }
}
