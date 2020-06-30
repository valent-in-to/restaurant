import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { NgForm } from '@angular/forms';
import { Order } from '../shared/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [
  ]
})
export class OrdersComponent implements OnInit {

  orderList;

  constructor( private service: OrderService ) { }

  ngOnInit(): void {
    this.service.getOrderList().then(res=> this.orderList = res)
    

  }

  
}
