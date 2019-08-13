import { Component, OnInit , Inject } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PalletService } from 'src/app/services/pallet.service';
import { OrderService } from 'src/app/services/order.service';
import { StoredPalletComponent } from '../stored-pallet/stored-pallet.component';
import * as moment from 'moment';
import { IPallet } from 'src/app/models/pallet.model';
import { IBox } from 'src/app/models/box.model';
import { OrderStates } from 'src/app/utils/enums.utils';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-move-boxes',
  templateUrl: './move-boxes.component.html',
  styleUrls: ['./move-boxes.component.css']
})
export class MoveBoxesComponent implements OnInit {

  palletsCompany:IPallet[]= [];
  newPallet:IPallet;

  constructor(
    public dialogRef: MatDialogRef<MoveBoxesComponent>,    
    public palletClient: PalletService,
    public orderClient: OrderService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {    
    const pallets = this.data.palletsCompany;    
    for (let i = 0; i < pallets.length; i++) {
     const pallet = pallets[i] ;     
     if(pallet.status == OrderStates.StateProd){
       this.palletsCompany.push(pallet);
     }  
    }    
  }
  
  onSubmit(form:NgForm){
    console.log(form.controls.newPallet.value)
    const pallet = this.palletsCompany[form.controls.newPallet.value];
    pallet.boxes.push(this.data.box);  
    console.log(pallet)  
    this.dialogRef.close(pallet)
  
  }

  
  
  onClose(){
    this.dialogRef.close(false);
  }

}
