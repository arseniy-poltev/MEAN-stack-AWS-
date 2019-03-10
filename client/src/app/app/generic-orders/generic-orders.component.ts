import { Component, OnInit, Input, ViewChild, QueryList, OnChanges } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { IOrder } from 'src/app/models/order.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, Sort } from '@angular/material';
import { ICompany } from 'src/app/models/company.model';
import { OrderService } from 'src/app/services/order.service';
import { IConfig } from 'src/app/models/config.model';
import { IToken } from 'src/app/models/token.model';
import { CommentsOrderComponent } from '../comments-order/comments-order.component';
import { ImageOrderComponent } from '../image-order/image-order.component';
import { FilterOrdersComponent } from '../filter-orders/filter-orders.component';
import { PalletsComponent } from '../../prod/pallets/pallets.component';
import { IUser } from 'src/app/models/user.model';
import { NewOrderComponent } from '../new-order/new-order.component';
import { InitOrderComponent } from '../../prod/init-order/init-order.component'
import * as moment from 'moment';
import { OrderStates,Roles } from 'src/app/utils/enums.utils';
import {MatSnackBar} from '@angular/material';
import { CompanyService } from 'src/app/services/company.service';


@Component({
  selector: 'app-generic-orders',
  templateUrl: './generic-orders.component.html',
  styleUrls: ['./generic-orders.component.css']
})
export class GenericOrdersComponent implements OnInit, OnChanges {
  @Input() company: ICompany;
  @Input() state: string;
  @Input() user: IUser;
  token: IToken;
  config: IConfig;
  orders: IOrder[];
  dataOrders = new MatTableDataSource<IOrder>(this.orders);
  selection = new SelectionModel<IOrder>(true, []);
  enableActions = true;  
  sortedData:IOrder[];

  @Input() displayColumns: string[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;  
  @ViewChild(FilterOrdersComponent) filters: FilterOrdersComponent;

  constructor(
    private orderClient: OrderService,
    private sharedClient: SharedService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  updateMatTable() {
    this.orderClient.getOrdersByCompanyAndState(this.token, this.config, this.company, this.state).subscribe((orders) => {
      this.orders = orders;        
      this.dataOrders = new MatTableDataSource<IOrder>(this.orders);
      this.dataOrders.paginator = this.paginator;
      this.dataOrders.sort = this.sort;
      this.applyFilter();
      
    });    
  }
  ngOnInit() { 
      
    this.sharedClient.config.subscribe((config) => {
      this.config = config;
    });
    this.sharedClient.token.subscribe((token) => {
      this.token = token;
      
      this.orderClient.getOrdersByCompanyAndState(this.token, this.config, this.company, this.state).subscribe((orders) => {
        this.orders = orders;        
        this.updateMatTable();
      });
    });
    this.sharedClient.socket.subscribe((emit) => {
      //console.log(emit)
      if (emit == null) {
        return;
      }
      if (emit.modelName === 'order') {
        const order = <IOrder>emit.data;
        if (order.company === this.company._id) {
          switch (emit.actionDb) {
            case 'create': {
              this.addNewOrderSocket(order);
            } break;
            case 'update': {
              this.editOrderSocket(order);
            } break;
            case 'delete': {
              this.removeOrderSocket(order);
            } break;
          }
        }
      }
    });
    if(this.user.rol === Roles.Prod){
      this.enableActions = false;
    }
  }
  ngOnChanges() {
  }
  removeOrderSocket(order: IOrder) {
    this.orders = this.orders.filter((inOrder) => {
      return inOrder._id !== order._id;
    });
    this.selection.clear()
    this.updateMatTable();
  }
  editOrderSocket(order: IOrder) {
    this.orders = this.orders.map((inOrder) => {
      if (inOrder._id === order._id) {
        return order;
      } else {
        return inOrder;
      }
    });
    this.selection.clear()
    this.updateMatTable();
  }
  addNewOrderSocket(order: IOrder) {
    this.orders.push(order);
    this.filters.cleanFilters()
    this.selection.clear()
    this.updateMatTable();
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataOrders.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataOrders.data.forEach(row => this.selection.select(row));
  }
  getClassState(status: string) {
    console.log(status);
    return 'status';
  }
  showDialogFile(order:IOrder){
    this.dialog.open(ImageOrderComponent, {
      width: '500px',
      data: {
        company: this.company,
        token: this.token,
        config: this.config,
        user: this.user,
        order: order
      }
    });
  }
  showDialogComments(order: IOrder) {
    this.dialog.open(CommentsOrderComponent, {
      width: '500px',
      data: {
        company: this.company,
        token: this.token,
        config: this.config,
        user: this.user,
        order: order
      }
    });

  }
  showAllPallets(){
    this.dialog.open(PalletsComponent, {
      height: '100%',
      width:'500px',
      data: {
        title: 'Pallets Producción',
        company: this.company,
        token: this.token,
        config: this.config,
        user: this.user ,
        view: "all"      
      }
    });
  }
  onDelete() {
    if (this.selection.selected.length === 0) {
      alert('seleccione uno o más registros');
    } else {
      const confirmResp = window.confirm('¿está seguro de eliminar los registros? esta acción no tiene reversa');
      if (confirmResp) {
        this.selection.selected.forEach((order) => {
          this.orderClient.delete(this.token, this.config, order).subscribe((resp) => {
            console.log(resp);
          });
        });
      }
    }
  }
  onChangeToProduction(order){
    const confirmResp = window.confirm('¿está seguro de enviar a producción esta orden? esta acción no tiene reversa');
      if (confirmResp) {  
        if(order.image == "" && !order.noSerie){
          window.alert('Debe cargar una imagen al pedido para pasarlo a producción');
        }else{
          order.status = OrderStates.StateProd
          this.orderClient.update(this.token, this.config, order).subscribe((resp) => {
            console.log(resp);
          }); 
          this.orderClient.getOrdersByCompanyAndState(this.token, this.config, this.company, this.state).subscribe((orders) => {
            this.orders = orders;        
            this.updateMatTable();
          });
        }          
      }     
  }
  onEdit() {
    if (this.selection.selected.length === 0) {
      alert('seleccione almenos un registro');
    } else if (this.selection.selected.length > 1) {
      alert('seleccione solo un registro');
    } else {
      this.dialog.open(NewOrderComponent, {
        disableClose: true,
        width: '400px',
        data: {
          title: 'Nueva Orden',
          company: this.company,
          token: this.token,
          config: this.config,
          user: this.user,
          order: this.selection.selected[0],
          isEditMode: true
        }
      });
    }
  }
  getAllocation(currentOrder:IOrder):boolean{
    let response = false;
    let orders = this.orders;
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      if(this.user.rol == Roles.Design && order._id != currentOrder._id){
        for (let j = 0; j < order.designer.length; j++) {
          const designer = order.designer[j];
          if(this.user.mail == designer.mail){
            response = true;
            j = order.designer.length;
            i = orders.length;
          }
        }
      }

      if(this.user.rol == Roles.Prod && order._id != currentOrder._id){
        for (let j = 0; j < order.operator.length; j++) {
          const operator = order.operator[j];
          if(this.user.mail == operator.mail){
            response = true;
            j = order.operator.length;
            i = orders.length;
          }
        }
      }
      
    }
    return response
  }
  onUserAsign(order:IOrder) { 
    let isAllocated = this.getAllocation(order);    
    if(isAllocated && !this.enableActions){
      alert("Usted ya se encuentra asignado a una orden");      
    }else if(!this.enableActions){      
      if(this.user.rol == Roles.Design && this.state == OrderStates.StateDesign){
        let isAsigned = false;         
        let newDesignersList = [];
        order.designer.forEach(user => {
          if(user.mail === this.user.mail){
            const confirmResp = window.confirm('¿desea dejar el desarrollo de este pedido?');
            if(!confirmResp){
              newDesignersList.push(this.user)                           
            }
            isAsigned = true;                       
          }else{
            newDesignersList.push(user)
          }
        });
        if(!isAsigned){
          newDesignersList.push(this.user)
        }
        order.designer = newDesignersList;
        this.orderClient.update(this.token, this.config, order).subscribe((newOrder) => {
          console.log("usuario asignado con exito")
        });        
      }
      if(this.user.rol == Roles.Prod && this.state == OrderStates.StateProd){              
        const dialog = this.dialog.open(InitOrderComponent, {          
          data: {            
            company: this.company,
            token: this.token,
            config: this.config,
            user: this.user,
            order: order,
            isEditMode: true
          }
        });

        dialog.afterClosed().subscribe(result => { 
          if(result){                
            this.snackBar.open("El pedido ha sido guardado exitosamente", null, {
              duration: 2000,
            });
          }     
        });
        
      }
    }      
  }
  applyFilter(){       
    if(this.filters.filterDataOrder != null){
      this.dataOrders.filterPredicate = this.filters.filterDataOrder.filterPredicate;
      this.dataOrders.filter = this.filters.filterDataOrder.filter;
    }else{
      this.dataOrders.filter = "";
    }
    
    
  }
  sortData(sort:Sort){
    const data = this.orders;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      if(sort.active == 'info'){
        return this.compare(a.inDate, b.inDate, isAsc)
      }      
    });
  }
  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  getFormat(date: Date) {
    return moment(date).locale('es').format('DD MMM YYYY');
  }
  
}
