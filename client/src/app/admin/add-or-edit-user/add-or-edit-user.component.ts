import { Component, Inject , OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/models/user.model';
import { CommonUtils } from 'src/app/utils/common.utils';
import { Roles } from 'src/app/utils/enums.utils';
import { createEmptyState } from '@angular/router/src/router_state';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

declare class rol {
  name:string
}

@Component({
  selector: 'app-add-or-edit-user',
  templateUrl: './add-or-edit-user.component.html',
  styleUrls: ['./add-or-edit-user.component.css']
})



export class AddOrEditUserComponent implements OnInit {

  user:IUser;  
  roles:rol[]=[];
  

  constructor(
    private userClient:UserService,
    private dialogRef: MatDialogRef<AddOrEditUserComponent>,
    private common: CommonUtils,
    @Inject(MAT_DIALOG_DATA) public data: any){            
      if(data.user === null || data.user === undefined){
        this.user = {
          mail: null,
          name:null,
          password:null,
          rol:null
        }
      }else{
        this.user = data.user;
      }
    } 

  ngOnInit(){
    this.roles.push({name:Roles.Admin})
    this.roles.push({name:Roles.Design})
    this.roles.push({name:Roles.Prod})
    this.roles.push({name:Roles.Store})
  }

  close() {
    this.dialogRef.close();    
  }

  onSubmit(form: NgForm) {
    if (!form.invalid) {
      this.user.name = form.controls.name.value;
      this.user.mail = form.controls.mail.value;      
      this.user.rol = form.controls.rol.value;
             
      if (!this.data.isEditMode) { 
        this.user.password = this.common.createHash(form.controls.password.value);       
        this.userClient.create(this.user, this.data.config, this.data.token).subscribe((neworder) => {
          this.dialogRef.close();
        });
      } else {        
        this.userClient.update(this.user, this.data.config, this.data.token).subscribe((newOrder) => {
          this.dialogRef.close();
        });      
      }
      
    }
  }

}
