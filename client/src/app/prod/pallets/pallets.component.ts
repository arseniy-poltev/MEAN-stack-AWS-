import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { IPallet} from '../../models/pallet.model';
import { IOrder} from '../../models/order.model';
import { PalletService } from 'src/app/services/pallet.service';
import { SharedService } from 'src/app/services/shared.service';
import { ExportToXlsxService } from 'src/app/services/export-to-xlsx.service';
import { IUser } from 'src/app/models/user.model';
import { IConfig } from 'src/app/models/config.model';
import { IToken } from 'src/app/models/token.model';
import { OrderStates } from 'src/app/utils/enums.utils';
import { LoadBoxesComponent } from '../load-boxes/load-boxes.component';
import { EditPalletComponent } from '../edit-pallet/edit-pallet.component';
import { StoredPalletComponent } from '../stored-pallet/stored-pallet.component';


@Component({
  selector: 'app-pallets',
  templateUrl: './pallets.component.html',
  styleUrls: ['./pallets.component.css']
})
export class PalletsComponent implements OnInit {

  pallet: IPallet;
  palletsCompany: IPallet[];
  palletsCreator: IPallet[];
  currentUser: IUser;
  counter:number;
  name:string;
  config: IConfig;
  token: IToken;
  order: IOrder;
  view:String;
  boxesCounter:Number;  
  showStore:Boolean;
  orderFilter:String;
  filterOrderValues:String[];
  filteredPalletsCompany: IPallet[];
  filteredPalletsCreator: IPallet[];

  constructor(
    public dialogRef: MatDialogRef<PalletsComponent>,
    public palletClient: PalletService,
    private sharedClient: SharedService, 
    private excelClient: ExportToXlsxService,
    public dialog: MatDialog,   
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
      this.currentUser = data.user;
      this.view = data.view;      
      this.showStore = false;
      this.filterOrderValues = [];
      this.palletsCreator = [];
      this.palletsCompany = [];
  }

  ngOnInit() {     
    this.sharedClient.config.subscribe((config) => {
      this.config = config;
    });
    this.sharedClient.token.subscribe((token) => {
      this.token = token;      
      this.dialogRef.updatePosition({ bottom: '0px', right: '0px' });
      this.palletClient.getPalletsByCompany(this.data.token, this.data.config, this.data.company).subscribe((pallets) => {        
        this.palletsCompany = pallets;
        this.applyFilter();              
      });

      this.palletClient.getOrdersByCompanyAndCreator(this.data.token, this.data.config, this.data.company, this.currentUser.mail).subscribe((pallets) => {        
        this.palletsCreator = pallets.sort(function(a,b){          
          return a.counter - b.counter;
        })
        this.applyFilter();                
      })
    });
    this.sharedClient.socket.subscribe((emit) => {
      if (emit == null) {
        return;
      }
      if (emit.modelName === 'pallet') {
        const pallet = <IPallet>emit.data;
        if (pallet.company === this.data.company._id) {
          switch (emit.actionDb) {
            case 'create': {
              this.addNewPalletSocket(pallet);
            } break;
            case 'update': {
              this.editPalletSocket(pallet);
            } break;
            case 'delete': {
              this.removePalletSocket(pallet);
            } break;
          }
        }
      }
    });  
      
  }
  removePalletSocket(pallet: IPallet) {
    this.palletClient.getPalletsByCompany(this.data.token, this.data.config, this.data.company).subscribe((pallets) => {        
      this.palletsCompany = pallets; 
      this.applyFilter();     
    });

    this.palletClient.getOrdersByCompanyAndCreator(this.data.token, this.data.config, this.data.company, this.currentUser.mail).subscribe((pallets) => {
      this.palletsCreator = pallets
      this.applyFilter();        
    })    
  }
  editPalletSocket(pallet: IPallet) {
    this.palletsCompany = this.palletsCompany.map((inPallet) => {
      if (inPallet._id === pallet._id) {
        return pallet;
      } else {
        return inPallet;
      }
    }); 
    this.palletClient.getOrdersByCompanyAndCreator(this.data.token, this.data.config, this.data.company, this.currentUser.mail).subscribe((pallets) => {
      this.palletsCreator = pallets  
      this.applyFilter();      
    })    
  }
  addNewPalletSocket(pallet: IPallet) {     
    this.palletClient.getPalletsByCompany(this.data.token, this.data.config, this.data.company).subscribe((pallets) => {        
      this.palletsCompany = pallets; 
      this.applyFilter();     
    });

    this.palletClient.getOrdersByCompanyAndCreator(this.data.token, this.data.config, this.data.company, this.currentUser.mail).subscribe((pallets) => {
      this.palletsCreator = pallets.sort(function(a,b){        
        return a.counter - b.counter;
      }) 
      this.applyFilter();       
    })  
  }
  onCreate(){  
    document.querySelector('.addButton').classList.add('btnDisabled') 
    this.counter = this.getCounter();
    if(this.counter > 0){
      this.getName();
      this.pallet = {
        boxes:[],
        storer:null,
        company:this.data.company._id,
        outDate:null,
        status:OrderStates.StateProd,
        storerDate:null,
        createdBy:this.currentUser.mail,
        name:this.name,
        counter:this.counter
      }
      this.palletClient.create(this.data.token, this.data.config, this.pallet).subscribe((newPallet) => {
        this.palletsCreator.push(newPallet);
        this.palletsCreator = this.palletsCreator.sort(function(a,b){
          return a.counter - b.counter;
        }) 
        document.querySelector('.addButton').classList.remove('btnDisabled')        
      });
    }
  }
  onEdit(pallet){
    const dialog = this.dialog.open(EditPalletComponent, { 
      height:'90%',         
      data: {        
        company: this.data.company,
        token: this.data.token,
        config: this.data.config,
        user: this.data.user,
        order: this.data.order,
        pallet: pallet,
        palletsCompany: this.palletsCompany      
      }
    });

    dialog.afterClosed().subscribe(result => { 
      this.ngOnInit();    
    });
  }
  onDelete(pallet) {
    const confirmResp = window.confirm('¿está seguro de eliminar este pallet? esta acción no tiene reversa');
    if (confirmResp) {
      this.palletClient.delete(this.token, this.config, pallet).subscribe((resp) => {
        console.log(resp);
      });      
    }
  }
  onStored(pallet){
    const dialog = this.dialog.open(StoredPalletComponent, {           
      data: {        
        company: this.data.company,
        token: this.data.token,
        config: this.data.config,
        user: this.data.user,
        order: this.data.order,
        pallet: pallet ,
        palletsCompany: this.palletsCompany     
      }
    });

    dialog.afterClosed().subscribe(result => { 
      this.ngOnInit();    
    });
  }
  onPrint(pallet){
    let table = document.createElement('table');
    let trCollection = `
      <tr>
        <td colspan=6>Contenido de ${pallet.name}</td>
      </tr>
      <tr>
        <td>Orden</td>
        <td>Referencia</td>
        <td>Modelo</td>
        <td>Articulo</td>
        <td>Visual</td>
        <td>N Cajas</td>
      </tr>
    `;
    for (let i = 0; i < pallet.boxes.length; i++) {
      const element = pallet.boxes[i];
        trCollection += `
        <tr>
          <td>${i}</td>
          <td>${element.order.ref}</td>
          <td>${element.order.product.name}</td>
          <td>${element.order.modelColor}</td>
          <td>${element.order.visual}</td>
          <td>${element.units}</td>
        </tr>`
    }
    table.innerHTML = trCollection;    
    this.excelClient.exportAsExcelFile(table, pallet.name);
  }
  getCounter():number{
    let length = 0;
    let counter = 1; 
    let counterArray = [];
    for(var i = 0;i<this.palletsCreator.length;i++){
      let currentPallet = this.palletsCreator[i];
      if(currentPallet.status == OrderStates.StateProd){
        length += 1;
        counterArray.push(currentPallet.counter);       
      }        
    }     
    if(length == 10){
      alert("se han creado el número máximo de pallets por usuario, comuniquese con el administrador");
      document.querySelector('.addButton').classList.remove('btnDisabled');
      counter = 0;      
    }else{
      for(var i = 0;i<counterArray.length;i++){
        if(counterArray.indexOf(counter) != -1){
          counter += 1;
        }else{
          i = counterArray.length;
        }
      }      
    }
    return counter 
  }
  getName(){
    const nameArray = this.currentUser.name.split(" ");
    if(nameArray.length == 1){
      this.name = nameArray[0].charAt(0).toUpperCase() + nameArray[0].charAt(1).toUpperCase() + ' Pallet ' + this.counter;
    }

    if(nameArray.length <= 3 && nameArray.length > 1){
      this.name = nameArray[0].charAt(0).toUpperCase() + nameArray[1].charAt(0).toUpperCase() + ' Pallet ' + this.counter;
    }
    
    if(nameArray.length > 3){
      this.name = nameArray[0].charAt(0).toUpperCase() + nameArray[2].charAt(0).toUpperCase() + ' Pallet ' + this.counter;
    }
  }
  loadBoxes(pallet){
    const dialog = this.dialog.open(LoadBoxesComponent, {  
      width:'450px',    
      data: {        
        company: this.data.company,
        token: this.data.token,
        config: this.data.config,
        user: this.data.user,
        order: this.data.order,
        pallet: pallet 
      }
    });

    dialog.afterClosed().subscribe(result => { 
      if(result){                
        this.dialogRef.close(true)
      }     
    });
  }  
  onChangeView(stored:Boolean){
    this.showStore = stored;       
    this.filterOrderValues = [];
    this.cleanFilter();
  }
  cleanFilter(){
    this.orderFilter = null;
    this.applyFilter();    
  }
  applyFilter(){
    let view = OrderStates.StateProd;
    if(this.showStore){
      view = OrderStates.StateStore;
    }

    if(this.orderFilter != null){
      this.filteredPalletsCompany = this.palletsCompany.filter(pallet =>{       
        return this.evalPalletFilter(view,pallet);
      });
      this.filteredPalletsCreator = this.palletsCreator.filter(pallet =>{
        return this.evalPalletFilter(view,pallet);
      });
    }else{
      this.filteredPalletsCompany = this.palletsCompany.filter(pallet =>{
        if(pallet.status == view){
          this.getFilterValues(pallet);
          return true
        }        
      });
      this.filteredPalletsCreator = this.palletsCreator.filter(pallet => {
        if(pallet.status == view){
          this.getFilterValues(pallet);
          return true
        }
      })
    }    
  }
  evalPalletFilter(view:String,pallet:IPallet):Boolean{
    let response = false
      if(pallet.status == view){
        pallet.boxes.forEach(box => {          
          if(box.order.ref == this.orderFilter){
            response = true
          }
        });
      }        
    return response
  }
  getFilterValues(pallet:IPallet){
    pallet.boxes.forEach( box => {
      if(this.filterOrderValues.indexOf(box.order.ref) == -1){
        this.filterOrderValues.push(box.order.ref);
      }        
    });
  }
}

