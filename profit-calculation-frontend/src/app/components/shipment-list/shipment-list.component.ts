import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html'
})
export class ShipmentListComponent {
  @Input() shipments: any[] = [];

  // Optional helper methods for use in template
  getTotalPayments(shipment: any): number {
    return shipment?.customers?.reduce(
      (acc: number, c: any) => acc + (Number(c.paymentAmount) || 0),
      0
    ) || 0;
  }

  getTotalCosts(shipment: any): number {
    return shipment?.serviceProv?.reduce(
      (acc: number, s: any) => acc + (Number(s.costAmount) || 0),
      0
    ) || 0;
  }

  getProfit(shipment: any): number {
    return this.getTotalPayments(shipment) - this.getTotalCosts(shipment);
  }
}
