import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, ShipmentDto } from '../../services/api.service';

@Component({
  selector: 'app-shipment-form',
  templateUrl: './shipment-form.component.html',
  styleUrls: ['./shipment-form.component.css']
})
export class ShipmentFormComponent implements OnInit {
  form: FormGroup;
  result: ShipmentDto | null = null;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.form = this.fb.group({
      referenceNumber: ['shipment1', Validators.required],
      customers: this.fb.array([]),
      serviceProv: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // seed 2 customer + 3 services as in earlier SQL data (optional)
    if (this.customers.length === 0) {
      this.addCustomer('customer1', 1200);
      this.addCustomer('customer2', 800);
    }
    if (this.serviceProv.length === 0) {
      this.addServiceProvider('Fuel Costs', 300);
      this.addServiceProvider('Handling Fees', 100);
      this.addServiceProvider('Maintenance', 50);
    }
  }

  get customers(): FormArray { return this.form.get('customers') as FormArray; }
  get serviceProv(): FormArray { return this.form.get('serviceProv') as FormArray; }

  addCustomer(name = '', payment = 0) {
    this.customers.push(this.fb.group({ name: [name], paymentAmount: [payment] }));
  }
  addServiceProvider(name = '', cost = 0) {
    this.serviceProv.push(this.fb.group({ name: [name], costAmount: [cost] }));
  }

  // totals computed from current form value
  getTotalPayments(): number {
    const cs = this.form.value.customers || [];
    return cs.reduce((s: number, c: any) => s + (Number(c.paymentAmount) || 0), 0);
  }
  getTotalCosts(): number {
    const ss = this.form.value.serviceProv || [];
    return ss.reduce((s: number, x: any) => s + (Number(x.costAmount) || 0), 0);
  }
  getProfit(): number {
    return +(this.getTotalPayments() - this.getTotalCosts()).toFixed(2);
  }

  onSubmit() {
    const payload: ShipmentDto = {
      referenceNumber: this.form.value.referenceNumber,
      customers: (this.form.value.customers || []).map((c: any) => ({ name: c.name, paymentAmount: Number(c.paymentAmount) || 0 })),
      serviceProv: (this.form.value.serviceProv || []).map((s: any) => ({ name: s.name, costAmount: Number(s.costAmount) || 0 })),
    };
    // compute and save via service
    this.api.saveShipment(payload);
    this.result = {
      ...payload,
      profitOrLoss: this.getProfit()
    };
    // optional: clear form or leave as-is
  }
}
