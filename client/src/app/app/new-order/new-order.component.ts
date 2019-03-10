import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { IOrder } from 'src/app/models/order.model';
import { OrderStates } from 'src/app/utils/enums.utils';

@Component({ 
  selector: 'app-new-order',
  templateUrl: './new-order.component.html', 
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  colors: any[] = [];
  order: IOrder;
  noSerieOrder:Boolean;
  constructor(
    public dialogRef: MatDialogRef<NewOrderComponent>,
    public orderClient: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.order = data.order; 
      if (this.order === null || this.order === undefined) {
        this.order = {
          actions: [],
          colors: [],
          comments: [],
          company: this.data.company,
          designer: [],
          image: '',
          inDate: null,
          modelColor: null,
          modelRef: '',
          operator: [],
          outDate: null,
          product: {
            name: '',
            units: 0
          } ,
          ref: null,
          status: OrderStates.StateDesign,
          storer: null,
          units: 0,
          visual:'',
          noSerie:false
        };
      }
    }

  ngOnInit() {
    if (this.order !== null) {
      this.colors = this.order.colors.map(color => {
        return {value: color};
      });
    } else {
      this.colors.push({value: ''});
    }
  }
  close() {
    this.dialogRef.close();
  }
  onSubmit(form: NgForm) {
    if (!form.invalid) {
      this.order.actions = [{
        date: (new Date()),
        desc: 'Creación de Orden',
        user: this.data.user
     }];
      this.order.colors = [];
      let colorsSize = this.colors.length;
      for(let i = 0;i < colorsSize;i++){
        let color = this.colors[i];
        if(color.value !== ""){
          this.order.colors.push(color.value);
        }
      }    
      this.order.inDate = form.controls.inDate.value;
      this.order.product = this.data.company.products.filter(product => product.name === form.controls.product.value)[0];
      this.order.status = OrderStates.StateDesign;
      this.order.noSerie = form.controls.noSerie.value;
      if(!this.order.noSerie){
        this.order.modelColor = form.controls.modelColor.value;
        this.order.visual = form.controls.visual.value;
      }else{
        this.order.colors = [];
        this.order.visual = ""; 
      }             
      if (!this.data.isEditMode) {        
        this.orderClient.create(this.data.token, this.data.config, this.order).subscribe((neworder) => {
          this.dialogRef.close();
        });
      } else {
        this.orderClient.update(this.data.token, this.data.config, this.order).subscribe((newOrder) => {
          this.dialogRef.close();
        });      }
      
    }
  }
  addColor() {
    this.colors.push({value: ''});
  }

}
