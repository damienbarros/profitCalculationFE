import { Component } from '@angular/core';
import { ProfitRow } from './components/shipment-list/shipment-list.component';

@Component({
  selector: 'app-root',
  template: `
    <app-shipment-form (addRow)="onAddRow($event)"></app-shipment-form>
    <app-shipment-list [rows]="rows"></app-shipment-list>
  `
})
export class AppComponent {
  rows: ProfitRow[] = [
    // example existing rows (if you want them pre-filled)
    // { reference: 'shipment1', income: 1000, totalCosts: 200, profitOrLoss: 800 },
    // { reference: 'shipment2', income: 500, totalCosts: 900, profitOrLoss: -400 }
  ];

  onAddRow(row: ProfitRow) {
    // push to list (or do a replace/unique logic)
    this.rows = [...this.rows, row];
  }
}
