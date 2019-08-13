import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ViewUsersComponent } from './view-users/view-users.component';
import { AddOrEditUserComponent } from './add-or-edit-user/add-or-edit-user.component';




@NgModule({
  declarations: [
    AdminComponent,
    ViewUsersComponent,
    AddOrEditUserComponent    
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    CommonModule,
    FormsModule
  ],
  entryComponents: [
    AddOrEditUserComponent
  ]
})
export class AdminModule { }
