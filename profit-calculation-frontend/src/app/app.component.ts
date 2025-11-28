import { Component } from '@angular/core';
import { ProfitRow } from './components/shipment-list/shipment-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rows: ProfitRow[] = [
    // example existing rows (if you want them pre-filled)
    // { reference: '1', income: 1000, totalCosts: 200, profitOrLoss: 800 },
    // { reference: '2', income: 500, totalCosts: 900, profitOrLoss: -400 }
  ];

  onAddRow(row: ProfitRow) {
    // push to list
    this.rows = [...this.rows, row];
  }
}
