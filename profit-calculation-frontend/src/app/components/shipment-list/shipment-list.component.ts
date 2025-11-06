import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Shipment } from '../../models/shipment';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html'
})
export class ShipmentListComponent implements OnInit {
  shipments: Shipment[] = [];
  loading = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getShipments().subscribe({
      next: s => { this.shipments = s; this.loading = false; },
      error: _ => { this.loading = false; }
    });
  }
}
