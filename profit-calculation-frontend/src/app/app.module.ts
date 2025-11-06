import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ShipmentListComponent } from './components/shipment-list/shipment-list.component';
import { ShipmentFormComponent } from './components/shipment-form/shipment-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ShipmentListComponent,
    ShipmentFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ShipmentFormComponent },
      { path: 'shipments', component: ShipmentListComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
