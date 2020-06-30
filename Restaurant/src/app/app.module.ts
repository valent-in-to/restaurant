import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { ItemsComponent } from './orders/items/items.component';
import { OrderService } from './shared/order.service';

import { FormsModule, FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDialogModule } from '@angular/material/dialog';

import { HttpClientModule } from "@angular/common/http";




@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderComponent,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule
    
  ],
  entryComponents: [
    ItemsComponent
  ],
  providers: [
    OrderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
