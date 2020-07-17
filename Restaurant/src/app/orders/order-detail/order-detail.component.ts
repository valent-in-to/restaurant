import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { OrderService } from 'src/app/shared/order.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  itemList;
  total;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<OrderDetailComponent>,
  private service: OrderService,
  private userService: UserService) { }

  ngOnInit(): void {
  
      this.service.getOrderItems(this.data.ordernumber).subscribe((x: any) =>{
        this.itemList = x;
        this.total = this.itemList.reduce(function(prev, cur) {
          return prev + cur.itemTotal;
        }, 0);
      })
    
    
  }

  getUserType(){
    let userData = this.userService.getUserData()
    if(userData.identity.name == 'admin'){
      return true
    }
    return false
  }
  
   
    
  
  
}
