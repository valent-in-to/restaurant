import { Injectable } from '@angular/core';
import { Order } from './order';
import { OrderItem } from './order-item';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  formData: Order;
  orderItems: OrderItem[];
  constructor( private http: HttpClient ) { }


  uploadOrder(){

    let body ={
      ...this.formData,
      orderItems: this.orderItems
    }
    return this.http.post( environment.apiURL + 'add-order', body);
  }

  getOrderList(){
    return this.http.get(environment.apiURL + 'orders').toPromise()
  }

  updateOrderStatus(req: object){

    return this.http.post( environment.apiURL + 'update-status', req )
  }

  getOrderItems(orderno: number){
    return this.http.post(environment.apiURL + 'get-order-items', orderno)
  }
}
