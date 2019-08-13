import { Component, OnInit , Inject } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderService } from 'src/app/services/order.service';
import { PalletService } from 'src/app/services/pallet.service';
import { OrderStates } from 'src/app/utils/enums.utils';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { IPallet } from 'src/app/models/pallet.model';


@Component({
  selector: 'app-stored-pallet',
  templateUrl: './stored-pallet.component.html',
  styleUrls: ['./stored-pallet.component.css']
})
export class StoredPalletComponent implements OnInit {

  pallet:IPallet;
  counterBoxes:number;  

  constructor(
    public dialogRef: MatDialogRef<StoredPalletComponent>,    
    public palletClient: PalletService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.pallet = this.data.pallet;
    this.counterBoxes = 0;
  }

  ngOnInit() {
    for (let i = 0; i < this.pallet.boxes.length; i++) {
      const element = this.pallet.boxes[i];      
      this.counterBoxes += +element.units;
    }
  }
  getFormat(date: Date) {
    return moment(date).locale('es').format('DD MMM YYYY');
  } 
  onStored(form: NgForm){
    if (!form.invalid) {
      const confirmResp = window.confirm('¿está seguro de enviar el pallet al almacén? esta acción no tiene reversa');
      if (confirmResp) {
        this.pallet.storerDate = form.controls.storerDate.value;
        this.pallet.storer = this.data.user;
        this.pallet.status = OrderStates.StateStore;
        this.pallet.counter = this.getCounter();
        this.pallet.name = this.data.company.name + ' - ' + this.getFormat(this.pallet.storerDate) + ' - ' + this.pallet.counter;
        this.palletClient.update(this.data.token, this.data.config, this.pallet).subscribe((newPallet) => { 
          this.close();
        });
      }
    }
  }
  getCounter():number{
    let counter = 1;
    let counterArray = [];
    for (let i = 0; i < this.data.palletsCompany.length; i++) {
      const element = this.data.palletsCompany[i];
      if(element.status == OrderStates.StateStore){
        counterArray.push(element.counter);
      }      
    }
    if(counterArray.length > 0){
      if(counterArray.indexOf(counter) != -1){
        counter += 1;
      }
    }
    return counter
  }

  close(){
    this.dialogRef.close();
  }

}
