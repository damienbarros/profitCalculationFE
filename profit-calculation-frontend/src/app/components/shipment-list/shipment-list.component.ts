import { Component, OnInit } from '@angular/core';
import { ApiService, ShipmentDto } from '../../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.css']
})
export class ShipmentListComponent implements OnInit {
  shipments$: Observable<ShipmentDto[]>;

  constructor(private api: ApiService) {
    this.shipments$ = this.api.shipments$;
  }

  ngOnInit(): void {}

  getTotalPayments(s: ShipmentDto): number {
    return (s.customers || []).reduce((a, c) => a + (c.paymentAmount || 0), 0);
  }
  getTotalCosts(s: ShipmentDto): number {
    return (s.serviceProv || []).reduce((a, c) => a + (c.costAmount || 0), 0);
  }
  getProfit(s: ShipmentDto): number {
    return this.getTotalPayments(s) - this.getTotalCosts(s);
  }
}
