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
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LoginComponent } from './user/login/login.component';
import { UserService } from './shared/user.service';
import { ItemService } from './shared/item.service';

import { AuthGuardService } from "./shared/auth-guard.service";
import { AdminGuardService } from "./shared/admin-guard.service";




@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderComponent,
    ItemsComponent,
    UserComponent,
    SignUpComponent,
    LoginComponent
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
    UserService,
    ItemService,
    AuthGuardService,
    AdminGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
