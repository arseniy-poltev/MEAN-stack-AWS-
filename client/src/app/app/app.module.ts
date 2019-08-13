import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from '../material.module';
import { AuthComponent } from '../auth/auth.component';
import { SidenavComponent } from '../navigation/sidenav/sidenav.component';
import { NavlistComponent } from '../navigation/navlist/navlist.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageOrderComponent } from './image-order/image-order.component';
import { ActionsOrderComponent } from './actions-order/actions-order.component';
import { CommentsOrderComponent } from './comments-order/comments-order.component';
import { CommonModule } from '@angular/common';
import { AdminModule } from '../admin/admin.module';
import { RouterProtectComponent } from '../auth/router-protect/router-protect.component';
import { StoreComponent } from '../store/store.component';
import { GenericOrdersComponent } from './generic-orders/generic-orders.component';
import { GenericCompaniesComponent } from './generic-companies/generic-companies.component';
import { StateOrderComponent } from './state-order/state-order.component';
import { ProdComponent } from '../prod/prod.component';
import { DesignComponent } from '../design/design/design.component';
import { LoginComponent } from '../auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewOrderComponent } from './new-order/new-order.component';
import { AsignUserComponent } from './asign-user/asign-user.component';
import { ViewProdComponent } from '../design/view-prod/view-prod.component';
import { InitOrderComponent } from '../prod/init-order/init-order.component';
import { PalletsComponent } from '../prod/pallets/pallets.component';
import { FilterOrdersComponent } from './filter-orders/filter-orders.component';
import { LoadBoxesComponent } from '../prod/load-boxes/load-boxes.component';
import { EditPalletComponent } from '../prod/edit-pallet/edit-pallet.component';
import { StoredPalletComponent } from '../prod/stored-pallet/stored-pallet.component';
import { MoveBoxesComponent } from '../prod/move-boxes/move-boxes.component';
import { BLOB_STORAGE_TOKEN, IAzureStorage } from '../models/azure-storage-blob';
import { AzureStorageBlobService } from '../services/azure-storage-blob.service';


declare var AzureStorage: IAzureStorage;
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SidenavComponent,
    NavlistComponent,
    ImageOrderComponent,
    RouterProtectComponent,
    ActionsOrderComponent,
    StoreComponent,
    GenericOrdersComponent,
    GenericCompaniesComponent,
    StateOrderComponent,
    CommentsOrderComponent,
    ProdComponent,
    DesignComponent,
    LoginComponent,
    NewOrderComponent,
    AsignUserComponent,
    ViewProdComponent,
    InitOrderComponent,
    PalletsComponent,
    FilterOrdersComponent,
    LoadBoxesComponent,
    EditPalletComponent,
    StoredPalletComponent,
    MoveBoxesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AzureStorageBlobService,
    {
      provide: BLOB_STORAGE_TOKEN,
      useValue: AzureStorage.Blob
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CommentsOrderComponent, 
    NewOrderComponent, 
    AsignUserComponent, 
    ImageOrderComponent, 
    ViewProdComponent,
    InitOrderComponent,
    PalletsComponent,
    LoadBoxesComponent,
    EditPalletComponent,
    StoredPalletComponent,
    MoveBoxesComponent
  ]
})
export class AppModule { }
