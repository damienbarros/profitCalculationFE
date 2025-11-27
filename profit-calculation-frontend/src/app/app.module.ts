import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ShipmentFormComponent } from './components/shipment-form/shipment-form.component';
import { ShipmentListComponent } from './components/shipment-list/shipment-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ShipmentFormComponent,
    ShipmentListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
