import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OrderStates, Roles } from 'src/app/utils/enums.utils';
import { MatDialog } from '@angular/material';
import { NewOrderComponent } from '../new-order/new-order.component';
import { ICompany } from 'src/app/models/company.model';
import { IUser } from 'src/app/models/user.model';
import { IToken } from 'src/app/models/token.model';
import { IConfig } from 'src/app/models/config.model';

@Component({
  selector: 'app-actions-order',
  templateUrl: './actions-order.component.html',
  styleUrls: ['./actions-order.component.css']
})
export class ActionsOrderComponent implements OnInit {
  @Input() state: string;
  @Input() company: ICompany;
  @Input() user: IUser;
  @Input() config: IConfig;
  @Input() token: IToken;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  isDesign: Boolean;
  isAuthorizedUser: Boolean;
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isDesign = this.state === OrderStates.StateDesign;
    this.isAuthorizedUser = this.user.rol !== Roles.Prod;
  }
  showNewOrderForm() {
    this.dialog.open(NewOrderComponent, {
      disableClose: true,
      width: '400px',
      data: {
        title: 'Nueva Orden',
        company: this.company,
        token: this.token,
        config: this.config,
        user: this.user,
        isEditMode: false
      }
    });
  }
  onDelete() {
    this.delete.emit();
  }
  onEdit() {
    this.edit.emit();
  }
  
}
