import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';

import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { ItemsComponent } from '../items/items.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [
  ]
})
export class OrderComponent implements OnInit {

  constructor( public service: OrderService,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService ) { }

  ngOnInit(): void {
    this.resetForm();
    let userData = this.userService.getUserData()

    if (userData != null)
    { 
    this.service.formData.waiter = userData.identity.name
    }
  }

  resetForm( form?:NgForm ){

    if( form = null ){
      form.resetForm();
    }
    this.service.formData={
      orderNo: Math.floor((100000 + Math.random() * 900000)),
      id: null,
      customerName: null,
      gTotal: 0,
      orderType: 0,
      status: 1
    }

    this.service.orderItems = []
  }
  
  addEditItem(orderItemIndex, orderId){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "95%";
    dialogConfig.data = {
      orderItemIndex,
      orderId
    }
    this.dialog.open(ItemsComponent, dialogConfig).afterClosed().subscribe(res=>{
      this.updateGrandTotal();
    });
  }

  onDeleteOrderItem(orderItemId: number, i: number){
    this.service.orderItems.splice(i, 1);
    this.updateGrandTotal();
  }

  updateGrandTotal(){
    this.service.formData.gTotal =(this.service.orderItems.reduce((prev, curr)=>{
      return prev + curr.total;
    },0))

    this.service.formData.gTotal = parseFloat( this.service.formData.gTotal.toFixed(2) );
  }

  onSubmit(form: NgForm){
    this.service.uploadOrder().subscribe(res=>{
      this.resetForm();
      this.router.navigate(['orders'])
    })
  }


}
