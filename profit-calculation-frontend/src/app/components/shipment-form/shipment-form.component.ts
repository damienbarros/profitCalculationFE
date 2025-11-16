import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfitService } from '../../services/profit.service';


export interface ProfitRow {
  reference?: string;
  income: number;
  totalCosts: number;
  profitOrLoss: number;
}

@Component({
  selector: 'app-shipment-form',
  templateUrl: './shipment-form.component.html',
  styleUrls: ['./shipment-form.component.css']
})
export class ShipmentFormComponent implements OnInit {
  @Output() addRow = new EventEmitter<ProfitRow>();

  form!: FormGroup;
  ProfitService: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      reference: ['0001'],
      income: [0, [Validators.required, Validators.min(0)]],
      cost: [0, [Validators.required, Validators.min(0)]],
      additionalCost: [0, [Validators.required, Validators.min(0)]]
    });
  }

  getTotalCosts(): number {
    const c = Number(this.form.get('cost')?.value || 0);
    const a = Number(this.form.get('additionalCost')?.value || 0);
    return +(c + a);
  }

  onCalculate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const income = Number(this.form.get('income')?.value || 0);
    const totalCosts = this.getTotalCosts();
    const profitOrLoss = +(income - totalCosts);

    //const row: ProfitRow = {
      //reference: this.form.get('reference')?.value,
      //income,
      //totalCosts,
      //profitOrLoss
    //};

    //this.addRow.emit(row);

    const reference = this.form.get('reference')?.value;

    this.addRow.emit({reference, income, totalCosts, profitOrLoss});

    this.ProfitService.updateProfit(reference, profitOrLoss).subscribe({
      next: () => console.log("Shipment updated in DB"),
      error: (err: any) => console.error("Error updating profit", err)
    });

  }

  // convenience: reset income/costs if you want
  resetInputs(): void {
    this.form.patchValue({ income: 0, cost: 0, additionalCost: 0 });
  }
}
