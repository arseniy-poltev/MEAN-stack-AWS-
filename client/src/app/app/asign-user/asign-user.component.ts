import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { IOrder } from 'src/app/models/order.model';
import { IUser } from 'src/app/models/user.model';
import { OrderStates } from 'src/app/utils/enums.utils';


@Component({
  selector: 'app-asign-user',
  templateUrl: './asign-user.component.html',
  styleUrls: ['./asign-user.component.css']
})
export class AsignUserComponent implements OnInit {
  order: IOrder;
  state: String;
  usersList: IUser[] = [];
  asignedUsersList: IUser[] = [];
  userAsigned: IUser;
  currentUser: IUser;
  rol: string;
  showActions:boolean = true;

  constructor(
    public dialogRef: MatDialogRef<AsignUserComponent>,
    public orderClient: OrderService,
    public userClient: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.order = data.order;
    this.state = data.state;
    this.currentUser = data.user;
    if (this.state === OrderStates.StateDesign) {
      this.rol = "Diseñador"
      this.asignedUsersList = this.order.designer;
      if(this.order.status === OrderStates.StateProd){
        this.showActions = false
      }
    }
    if (this.state === OrderStates.StateProd) {
      this.rol = "Operario"
      this.asignedUsersList = this.order.operator;
    }
  }

  ngOnInit() {

    if (this.currentUser.rol === "Administrador") {
      this.userClient.getUsersByRol(this.rol, this.data.config, this.data.token).subscribe(
        (usersByRol) => {          
          for (let i = 0; i < usersByRol.length; i++) {
            let saved = true
            for (let j = 0; j < this.asignedUsersList.length; j++) {              
              if (usersByRol[i].mail == this.asignedUsersList[j].mail) {
                saved = false
                j = this.asignedUsersList.length;
              }
            }           
            if (saved) {
              this.usersList.push(usersByRol[i]);
            }
          }
        }
      )
    } else {
      if(this.asignedUsersList.length > 0){
        for (let j = 0; j < this.asignedUsersList.length; j++) {              
          if (this.currentUser.mail != this.asignedUsersList[j].mail) {
            this.usersList.push(this.currentUser);
          }
        }
      }else{
        this.usersList.push(this.currentUser);
      }
      
      
    }

  }
  close() {
    this.dialogRef.close();
  }
  onAsigned() {
    if (this.state === OrderStates.StateDesign) {
      this.order.designer.push(this.userAsigned);
      this.asignedUsersList = this.order.designer;
    }
    if (this.state === OrderStates.StateProd) {
      this.order.operator.push(this.userAsigned);
      this.asignedUsersList = this.order.designer;
    }
    this.orderClient.update(this.data.token, this.data.config, this.order).subscribe((newOrder) => {
      this.dialogRef.close();
    });
  }

}
