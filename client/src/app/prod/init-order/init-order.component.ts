import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { IOrder } from 'src/app/models/order.model';
import { IUser } from 'src/app/models/user.model';
import { PalletsComponent } from '../pallets/pallets.component'
import * as moment from 'moment';
import { OrderStates } from 'src/app/utils/enums.utils';


@Component({
  selector: 'app-init-order',
  templateUrl: './init-order.component.html',
  styleUrls: ['./init-order.component.css']
})
export class InitOrderComponent implements OnInit {
  order: IOrder;  
  usersList: IUser[] = [];
  asignedUsersList: IUser[] = [];
  userAsigned: IUser;
  currentUser: IUser;
  showInitButton: boolean;
  showSaveButton: boolean;

  constructor(
    public dialogRef: MatDialogRef<InitOrderComponent>,
    public orderClient: OrderService,
    public userClient: UserService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.order = data.order;
      this.currentUser = data.user;
      this.asignedUsersList = this.order.operator;
   }

  ngOnInit() {    
    if(this.asignedUsersList.length > 0){
      let userSaved = false;
      for (let j = 0; j < this.asignedUsersList.length; j++) {              
        if (this.currentUser.mail == this.asignedUsersList[j].mail) {          
          userSaved = true
        }
      }
      if(!userSaved){        
        this.showInitButton = true;
        this.showSaveButton = false;
      }else{
        this.showInitButton = false;
        this.showSaveButton = true;
      }
    }else{      
      this.showInitButton = true;
      this.showSaveButton = false;
    }    
  }
  
  onInitOrder(){    
    this.order.operator.push(this.currentUser);
    this.asignedUsersList = this.order.operator;
    this.orderClient.update(this.data.token, this.data.config, this.order).subscribe((newOrder) => {
      this.showInitButton = false;
      this.showSaveButton = true;      
    });
  }
  onAbortOrder(){
    const confirm = window.confirm('¿desea dejar el desarrollo de este pedido?');
    if(confirm){
      let newListUsers = [];
      this.order.operator.forEach((user)=>{        
        if(user.mail !== this.currentUser.mail){
          newListUsers.push(user);          
        }
      })
      this.order.operator = newListUsers;
      this.orderClient.update(this.data.token, this.data.config, this.order).subscribe((newOrder) => {
        this.showInitButton = true;
        this.showSaveButton = false;      
      });
    }
    
  }
  onSavedOrder(){    
    const dialog = this.dialog.open(PalletsComponent, {
      height: '100%',
      width:'500px',
      data: {
        title: 'Pallets Producción',
        company: this.data.company,
        token: this.data.token,
        config: this.data.config,
        user: this.data.user,
        order: this.data.order        
      }
    });

    dialog.afterClosed().subscribe(result => { 
      if(result){                
        this.dialogRef.close(true)
      }     
    });
  }

  close() {
    this.dialogRef.close(false);
  }

  getFormat(date: Date) {
    return moment(date).locale('es').format('DD MMM YYYY');
  }

}
