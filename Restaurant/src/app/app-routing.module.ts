import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './orders/order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LoginComponent } from './user/login/login.component';

import { AuthGuardService } from "./shared/auth-guard.service";
import { AdminGuardService } from './shared/admin-guard.service';


const routes: Routes = [
  {path:'', redirectTo:'orders', pathMatch:'full', },
  {path:'orders', component:OrdersComponent, canActivate:[AuthGuardService]},
  {path:'order', canActivate:[AuthGuardService] ,children:[
    {path:'', component:OrderComponent},
    {path:'edit/:id', component:OrderComponent}
  ]},
  {path:'signup', component:SignUpComponent, canActivate:[AdminGuardService]},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
