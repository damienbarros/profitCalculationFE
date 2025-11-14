import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export interface ProfitRow {
  reference?: string;
  income: number;
  totalCosts: number;
  profitOrLoss: number;
}

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShipmentListComponent {
  @Input() rows: ProfitRow[] = [];

  trackByIndex(index: number) {
    return index;
  }
}
