import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { SharedService } from 'src/app/services/shared.service';
import { MatDialog } from '@angular/material';
import { ViewProdComponent } from '../view-prod/view-prod.component'

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
  user: IUser;
  constructor(
    private sharedClient: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.sharedClient.user.subscribe((user) => {
      this.user = user;
    });
  }

  showProdView(){
    this.dialog.open(ViewProdComponent, {
      width: '90%',
      height: 'inherit',
      data: {        
        user: this.user
      }
    });
  }

}
