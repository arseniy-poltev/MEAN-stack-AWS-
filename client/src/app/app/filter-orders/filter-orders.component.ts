import { Component, OnInit, Input, Output, EventEmitter,OnChanges } from '@angular/core';
import { IOrder } from 'src/app/models/order.model';
import { MatTableDataSource} from '@angular/material';
import { NgForm } from '@angular/forms';
import { OrderStates } from 'src/app/utils/enums.utils';


@Component({
  selector: 'app-filter-orders',
  templateUrl: './filter-orders.component.html',
  styleUrls: ['./filter-orders.component.css']
})
export class FilterOrdersComponent implements OnChanges {

  @Input() state: string;
  @Input() filterDataOrder: MatTableDataSource<IOrder>;  
  @Output() applyFilter = new EventEmitter();
  filtersArray: string;
  modelFilter:string;
  modelColorFilter:number;
  referenceFilter:String;
  colorsFilter:String[];
  filterModelValues:String[];
  filterModelColorValues:number[];
  filterReferenceValues:String[]; 
  filterColorsValues:String[];
  colorsFilterActive:Boolean;
  
  

  constructor() {
    this.filterModelValues = [];
    this.filterModelColorValues = [];
    this.filterReferenceValues = []; 
    this.filterColorsValues = [];  
    this.colorsFilterActive = false;
      
   }

  ngOnInit() {
    
  }
  ngOnChanges(){
    if(this.filterDataOrder.data.length > 0){
      let orders = this.filterDataOrder.data
      for (let i = 0; i < orders.length; i++) {
        const element = orders[i];
        if(this.filterModelValues.indexOf(element.product.name) == -1){
          this.filterModelValues.push(element.product.name);
        }
        
        if(this.filterModelColorValues.indexOf(element.colors.length) == -1){
          this.filterModelColorValues.push(element.colors.length);
        } 
        
        if(this.filterReferenceValues.indexOf(element.ref) == -1){
          this.filterReferenceValues.push(element.ref);
        } 
        
        element.colors.forEach(color => {
          if(this.filterColorsValues.indexOf(color) == -1){
            this.filterColorsValues.push(color)
          }            
        });
      }
    }

  }  
  onChange(form: NgForm){
    this.filtersArray ="";   
    
    if(this.state == OrderStates.StateDesign || this.state == OrderStates.StateProd){
      
      if (this.modelColorFilter != null){        
        if(this.modelColorFilter > 0){
          this.colorsFilterActive = true;
        }else{
          this.colorsFilterActive = false;
        }                
      }     

      if(this.colorsFilter != null ){
        if(this.colorsFilter.length > this.modelColorFilter){
          window.alert('Solo puede seleccionar la cantidad de colores del filtro "Colores #')
          this.cleanFilters();
          this.colorsFilterActive = false;          
        }    
      }

      this.filterDataOrder.filterPredicate = (order) => {       
        let result = true;

        if (this.modelFilter != null){        
          result = result && order.product.name === this.modelFilter;
        }
        if (this.modelColorFilter != null){        
          result = result && order.colors.length === Number(this.modelColorFilter);         
        }
        if (this.referenceFilter != null){
          result = result && order.ref === this.referenceFilter;
        } 
  
        if(this.colorsFilter != null ){
          this.colorsFilter.forEach(color => {
            result = result && order.colors.indexOf(color) != -1;
          });
        }
        return result;        
      }      
      this.filterDataOrder.filter = "custom filters";
    }
    this.onApplyFilter();
  }

  cleanFilters(){
    this.modelFilter = null;
    this.modelColorFilter = null;
    this.referenceFilter = null;
    this.colorsFilter = null;
    this.filterDataOrder.filter = null;
    this.colorsFilterActive = false;
    this.onApplyFilter();
  }
  onApplyFilter(){
    this.applyFilter.emit();
  }
}
