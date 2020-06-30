import { Injectable } from '@angular/core';
import { Order } from './order';
import { OrderItem } from './order-item';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
}
