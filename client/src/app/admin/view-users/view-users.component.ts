import { Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AddOrEditUserComponent } from 'src/app/admin/add-or-edit-user/add-or-edit-user.component';

import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

import { IUser } from 'src/app/models/user.model';
import { IConfig } from 'src/app/models/config.model';
import { IToken } from 'src/app/models/token.model';
import { ShowHideDirective } from '@angular/flex-layout';


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  users: IUser[];
  token: IToken;
  config: IConfig;
  displayedColumns: string[] = [
    'select', 
    'image', 
    'info', 
    'rol', 
    'actions'
  ];
  dataUsers: MatTableDataSource<IUser>;
  selection = new SelectionModel<IUser>(true, []);
  
  constructor(
    private sharedClient: SharedService,
    private userClient: UserService,
    private dialog: MatDialog    
  ) {}

  updateMatTable() {
    this.dataUsers = new MatTableDataSource<IUser>(this.users) 
    this.dataUsers.paginator = this.paginator;
    this.dataUsers.sort = this.sort;
     
  }
  ngOnInit() {
    this.sharedClient.config.subscribe((config) => {
      this.config = config;
    });
    this.sharedClient.token.subscribe((token) => {
      this.token = token;
      
      this.userClient.getAllUsers(this.config, this.token).subscribe((Users) => {
        this.users = Users;               
        this.updateMatTable();
      });
    });
    this.sharedClient.socket.subscribe((emit) => {
      if (emit == null) {
        return;
      }
      if (emit.modelName === 'user') {
        const user = <IUser>emit.data;        
        switch (emit.actionDb) {
          case 'create': {
            this.addNewUserSocket(user);
          } break;
          case 'update': {
            this.editUserSocket(user);
          } break;
          case 'delete': {
            this.removeUserSocket();
          } break;
        }        
      }
    });
  }
  addNewUserSocket(user: IUser) {    
    this.users.push(user);     
    this.updateMatTable();
  }
  removeUserSocket() {
    this.userClient.getAllUsers(this.config, this.token).subscribe((Users) => {
      this.users = Users;               
      this.updateMatTable();
    });
  }
  editUserSocket(user: IUser) {    
    this.users = this.users.map((inUsers) => {
      if (inUsers.mail === user.mail) {
        return user;
      } else {
        return inUsers;
      } 
    });
    this.updateMatTable();
  }
  onEdit(user:IUser){
    this.showNewUserForm(user)
    this.selection.toggle(user)    
  }
  onDelete(){
    if (this.selection.selected.length === 0) {
      alert('seleccione uno o más registros');
    } else {
      const confirmResp = window.confirm('¿está seguro de eliminar los registros? esta acción no tiene reversa');
      if (confirmResp) {
        this.selection.selected.forEach((user) => {
          this.userClient.delete(user,  this.config,this.token).subscribe((resp) => {
            console.log(resp);
          });
        });
      }
    }
  }
  showNewUserForm(user?:IUser){
    
    if(user == null){
      this.dialog.open(AddOrEditUserComponent, {
        disableClose: true,
        width: '400px',
        data: {
          title: 'Nuevo Usuario',          
          token: this.token,
          config: this.config,
          user: user,
          isEditMode: false
        }
      });
    }else{
      this.dialog.open(AddOrEditUserComponent, {
        disableClose: true,
        width: '400px',
        data: {
          title: 'Editar Usuario',          
          token: this.token,
          config: this.config,
          user: user,
          isEditMode: true
        }
      });
    }
  }


  /** generic table function */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataUsers.data.length;
    return numSelected === numRows;
  }
  
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataUsers.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    this.dataUsers.filter = filterValue.trim().toLowerCase();

    if (this.dataUsers.paginator) {
      this.dataUsers.paginator.firstPage();
    }
  }
}
