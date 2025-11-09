import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipment-form',
  templateUrl: './shipment-form.component.html'
})
export class ShipmentFormComponent {
  form: FormGroup;
  result: any = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      referenceNumber: ['', Validators.required],
      customers: this.fb.array([]),
      serviceProv: this.fb.array([])
    });
  }

  get customers(): FormArray {
    return this.form.get('customers') as FormArray;
  }

  get serviceProv(): FormArray {
    return this.form.get('serviceProv') as FormArray;
  }

  addCustomer() {
    this.customers.push(this.fb.group({
      name: [''],
      paymentAmount: [0]
    }));
  }

  addServiceProvider() {
    this.serviceProv.push(this.fb.group({
      name: [''],
      costAmount: [0]
    }));
  }

  onSubmit() {
    this.result = this.form.value;
  }


  getTotalPayments(): number {
    return this.result?.customers?.reduce(
      (total: number, c: any) => total + (Number(c.paymentAmount) || 0),
      0
    ) || 0;
  }

  getTotalCosts(): number {
    return this.result?.serviceProv?.reduce(
      (total: number, s: any) => total + (Number(s.costAmount) || 0),
      0
    ) || 0;
  }

  getProfit(): number {
    return this.getTotalPayments() - this.getTotalCosts();
  }
}

