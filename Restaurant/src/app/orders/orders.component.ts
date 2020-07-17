import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { UserService } from "../shared/user.service";
import { Order } from '../shared/order';
import { Router } from "@angular/router";

/* trying to auto-fetch data */
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators'; 

/* implementing mat dialog for order detail after order is posted */
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { OrderDetailComponent } from './order-detail/order-detail.component';




@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [ 
  ]
})
export class OrdersComponent implements OnInit {

  orderList;

  constructor( private service: OrderService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.service.getOrderList().then(res=> {this.orderList = res});
    
    
    
    let pollInterval = 10000;
    const httpObservable = interval(pollInterval).pipe(
    switchMap(x => this.service.getOrderList())
   );
     httpObservable.subscribe((x: any[]) => {
       if(JSON.stringify(x)  == JSON.stringify(this.orderList)){
         console.log("sape")
         return;
       }else{
         console.log(x, this.orderList)
        this.orderList = x
       }
      });

  } 

  getUserType(){
    let userData = this.userService.getUserData()
    if(userData.identity.name == 'admin'){
      return true
    }
    return false
  }

  updateStatus(item: Order){
    let updatedValue;

    if(item.status == 1){
      updatedValue = 2
    }else if(item.status == 2){
      updatedValue = 0
    }

    let res = {
      orderNo: item.orderNo,
      status: updatedValue
    }
  
    this.service.updateOrderStatus(res).subscribe(res=>{
      this.service.getOrderList().then(res=> {this.orderList = res});
    },
    err =>{
      console.log(err)
    })
  }

  newOrder(){
    this.router.navigate(['/order'])
  }

 
  getOrderDetail(ordernumber: number){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "95%";
    dialogConfig.data = {
      ordernumber: ordernumber
    }
    this.dialog.open(OrderDetailComponent,dialogConfig)
  }
}

