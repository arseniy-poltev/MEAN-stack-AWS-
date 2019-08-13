import { Component, OnInit , Inject } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderService } from 'src/app/services/order.service';
import { PalletService } from 'src/app/services/pallet.service';
import { OrderStates } from 'src/app/utils/enums.utils';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { IBox } from 'src/app/models/box.model';

@Component({
  selector: 'app-load-boxes',
  templateUrl: './load-boxes.component.html',
  styleUrls: ['./load-boxes.component.css']
})
export class LoadBoxesComponent implements OnInit {
  isCompleted:boolean;
  counterBoxes:number;
  boxes:IBox[] = [];
  

  constructor(
    public dialogRef: MatDialogRef<LoadBoxesComponent>,
    public palletClient: PalletService,
    private orderService: OrderService,    
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.boxes = this.data.pallet.boxes;    
  }

  onSubmit(form: NgForm){
    if(this.isCompleted){
      this.data.order.status = OrderStates.StateStore;
      this.data.order.operator = [];
    }    
    this.data.pallet.boxes.push(
      {
        order:this.data.order,
        units:this.counterBoxes
      }
    )      
    this.palletClient.update(this.data.token, this.data.config, this.data.pallet).subscribe((newPallet) => { 
      if(this.isCompleted){        
        this.orderService.update(this.data.token, this.data.config, this.data.order).subscribe((newOrder) => {      
          this.dialogRef.close();
        });
      }else{
        this.dialogRef.close();
      }   
    }); 
  }
  getFormat(date: Date) {
    return moment(date).locale('es').format('DD MMM YYYY');
  }
  close(){
    this.dialogRef.close();
  }

}
