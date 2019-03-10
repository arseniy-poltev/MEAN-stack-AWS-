import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { interval } from 'rxjs';
import { OrderStates } from 'src/app/utils/enums.utils';

@Component({
  selector: 'app-state-order',
  templateUrl: './state-order.component.html',
  styleUrls: ['./state-order.component.css'],
  animations: [
    trigger('animateState', [
      state('Recibido', style({
        backgroundColor: 'rgba(11, 140, 253,0.75)',
        transform: 'scale(1)'
      })),
      state('transition-Recibido', style({
        backgroundColor: 'rgba(11, 140, 253,0.2)',
      })),
      state('Disenio', style({
        backgroundColor: 'rgba(18, 140, 71, 0.75)',
        transform: 'scale(1)'
      })),
      state('transition-Disenio', style({
        backgroundColor: 'rgba(18, 140, 71,0.2)',
      })),
      state('Prod', style({
        backgroundColor: 'rgba(18, 140, 71,0.75)',
        transform: 'scale(1)'
      })),
      state('transition-Prod', style({
        backgroundColor: 'rgba(18, 140, 71,0.2)',
      })),
      state('Store', style({
        backgroundColor: 'rgba(18, 140, 71, 0.75)',
        transform: 'scale(1)'
      })),
      state('transition-Store', style({
        backgroundColor: 'rgba(18, 140, 71, 0.2)',
      })),
      state('Cerrado', style({
        backgroundColor: 'rgba(128, 134, 95, 0.75)',
        transform: 'scale(1)'
      })),
      state('transition-Cerrado', style({
        backgroundColor: 'rgba(128, 134, 95, 0.2)',
      })),
      state('Alert', style({
        backgroundColor: 'rgba(206, 153, 18, 0.75)',
        transform: 'scale(1)'
      })),
      state('transition-Alert', style({
        backgroundColor: 'rgba(206, 153, 18, 0.2)',
      })),
      state('Warn', style({
        backgroundColor: 'rgba(206, 18, 18, 0.75)',
        transform: 'scale(1)'
      })),
      state('transition-Warn', style({
        backgroundColor: 'rgba(206, 18, 18, 0.2)',
      })),
      transition('*=>Recibido', animate('1000ms')),
      transition('*=>transition-Recibido', animate('1000ms')),
      transition('*=>Disenio', animate('1000ms')),
      transition('*=>transition-Disenio', animate('1000ms')),
      transition('*=>Prod', animate('1000ms')),
      transition('*=>transition-Prod', animate('1000ms')),
      transition('*=>Store', animate('1000ms')),
      transition('*=>transition-Store', animate('1000ms')),
      transition('*=>Cerrado', animate('1000ms')),
      transition('*=>transition-Cerrado', animate('1000ms')),
      transition('*=>Alert', animate('1000ms')),
      transition('*=>transition-Alert', animate('1000ms')),
      transition('*=>Warn', animate('1000ms')),
      transition('*=>transition-Warn', animate('1000ms'))
    ])
  ]
})
export class StateOrderComponent implements OnInit {
  @Input() state: string;
  currentState: string;
  infoState: string;
  constructor() { }

  ngOnInit() {
    this.currentState = this.state;
    interval(1000).subscribe(() => {
      if (this.currentState === `transition-${this.state}`) {
        this.currentState = this.state;
      } else {
        this.currentState =  `transition-${this.state}`;
      }
    });
    this.getInfoState();
  }
  getInfoState() {
    switch (this.state) {
      case OrderStates.StatePending: {
        this.infoState = 'no iniciado';
      }break;
      case OrderStates.StateDesign: {
        this.infoState = 'Diseño';
      }break;
      case OrderStates.StateClosed: {
        this.infoState = 'cerrado';
      }break;
      case OrderStates.StateWarn: {
        this.infoState = 'No hay suficientes unidades';
      }break;
      case OrderStates.StateAlert: {
        this.infoState = 'Riesgo de terminar unidades';
      }break;
      default: {
        this.infoState = 'En proceso';
      }break;
    }
  }

}
