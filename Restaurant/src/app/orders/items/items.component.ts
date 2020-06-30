import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { OrderItem } from 'src/app/shared/order-item';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';



@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styles: [
  ]
})
export class ItemsComponent implements OnInit {

  formData: OrderItem;
  itemList: Item[];
  isValid = true;



  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ItemsComponent>,
    private itemService: ItemService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {

    this.itemService.getItemList().then(res => this.itemList = res as Item[])
 
    if(this.data.orderItemIndex == null){
      this.formData = {
        id: null,
        orderId: this.orderService.formData.orderNo,
        itemId: 0,
        itemName: '',
        price: 0,
        amount: 1,
        total: 0
      }
    }
    else{
      this.formData = Object.assign( {}, this.orderService.orderItems[this.data.orderItemIndex]);
    }
  }

  updatePrice(ctrl){
    if(ctrl.selectedIndex == 0){
      this.formData.price = 0;
      this.formData.itemName = "";
    }
    else{
      this.formData.price = this.itemList[ctrl.selectedIndex-1].price;
      this.formData.itemName = this.itemList[ctrl.selectedIndex-1].name;
    }
    this.updateTotal();
  }

  updateTotal(){
    this.formData.total = this.formData.amount * parseFloat((this.formData.price).toFixed(2));
  }

  onSubmit(form:NgForm){
    if(this.validateForm(form.value)){

      if(this.data.orderItemIndex == null){
        this.orderService.orderItems.push(form.value);
      }
      else{
        this.orderService.orderItems[this.data.orderItemIndex] = form.value;
      }
      
      this.dialogRef.close();
    }
    
  }

  validateForm(formData:OrderItem){
    this.isValid = true;
    if(formData.itemId == 0 || formData.amount == 0){
      this.isValid = false;
    }
    return this.isValid;
    
  }
   
}
