import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Shipment } from '../../models/shipment';

@Component({
  selector: 'app-shipment-form',
  templateUrl: './shipment-form.component.html',
  styleUrls: ['./shipment-form.component.css']
})
export class ShipmentFormComponent implements OnInit {
  form: FormGroup;
  result?: Shipment;
  constructor(private fb: FormBuilder, private api: ApiService) {
    this.form = this.fb.group({
      referenceNumber: ['SHIP-0001', Validators.required],
      customers: this.fb.array([]),
      services: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // prefill one customer and one service for demo
    this.addCustomer();
    this.addService();
  }

  get customers() {
    return this.form.get('customers') as FormArray;
  }
  get services() {
    return this.form.get('services') as FormArray;
  }

  addCustomer() {
    this.customers.push(this.fb.group({
      name: ['Customer', Validators.required],
      paymentAmount: [0, Validators.required]
    }));
  }

  removeCustomer(index: number) { this.customers.removeAt(index); }

  addService() {
    this.services.push(this.fb.group({
      description: ['Cost', Validators.required],
      costAmount: [0, Validators.required]
    }));
  }

  removeService(index: number) { this.services.removeAt(index); }

  calculate() {
    const payload: Shipment = {
      referenceNumber: this.form.value.referenceNumber,
      customers: this.form.value.customers,
      serviceProv: this.form.value.services
    };
    this.api.calculate(payload).subscribe({
      next: res => {
        this.result = res;
      },
      error: err => {
        console.error(err);
        alert('Calculation failed. See console.');
      }
    });
  }

  resetResult() { this.result = undefined; }
}
