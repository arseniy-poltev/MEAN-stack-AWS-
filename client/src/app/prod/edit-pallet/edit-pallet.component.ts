import { Component, OnInit , Inject } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PalletService } from 'src/app/services/pallet.service';
import { OrderService } from 'src/app/services/order.service';
import { SharedService } from 'src/app/services/shared.service';
import { StoredPalletComponent } from '../stored-pallet/stored-pallet.component';
import { MoveBoxesComponent } from '../move-boxes/move-boxes.component'
import * as moment from 'moment';
import { IPallet } from 'src/app/models/pallet.model';
import { IBox } from 'src/app/models/box.model';
import { OrderStates } from 'src/app/utils/enums.utils';

@Component({
  selector: 'app-edit-pallet',
  templateUrl: './edit-pallet.component.html',
  styleUrls: ['./edit-pallet.component.css']
})
export class EditPalletComponent implements OnInit {

  pallet:IPallet;
  counterBoxes:number;

  constructor(
    public dialogRef: MatDialogRef<EditPalletComponent>,    
    public palletClient: PalletService,
    public orderClient: OrderService,
    private sharedClient: SharedService,
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
  onRemove(i:number){
    const box =  this.pallet.boxes[i];    
    const order = box.order;
    const confirmResp = window.confirm('¿está seguro de regresar este pedido a producción? esta acción no tiene reversa');
    if (confirmResp) {
      if(order.status == OrderStates.StateStore){
        order.status = OrderStates.StateProd;
        this.orderClient.update(this.data.token, this.data.config, order).subscribe((newOrder)=>{
          console.log(newOrder)
        })
      }
      this.pallet.boxes.splice(i,1)
      this.palletClient.update(this.data.token, this.data.config, this.pallet).subscribe((newPallet) => {      
        this.ngOnInit();
      });
    }    
  }
  onMove(box:IBox,i:number){
    const dialog = this.dialog.open(MoveBoxesComponent, {           
      data: {
        token: this.data.token,
        config: this.data.config,        
        box: box,
        palletsCompany: this.data.palletsCompany     
      }
    });
    dialog.afterClosed().subscribe(result => { 
      if(result){    
        console.log(result) 
        this.palletClient.update(this.data.token, this.data.config, result).subscribe((newPallet) => {      
          this.onRemove(i);          
        });     
      }     
    });
  }
  getFormat(date: Date) {
    return moment(date).locale('es').format('DD MMM YYYY');
  } 
  close(){
    this.dialogRef.close();
  }
  onStored(pallet:IPallet){
    this.dialog.open(StoredPalletComponent, {           
      data: {        
        company: this.data.company,
        token: this.data.token,
        config: this.data.config,
        user: this.data.user,
        order: this.data.order,
        pallet: pallet ,
        palletsCompany: this.data.palletsCompany     
      }
    });
  }
}
