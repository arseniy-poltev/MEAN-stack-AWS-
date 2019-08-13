import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { SharedService } from 'src/app/services/shared.service';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-prod',
  templateUrl: './prod.component.html',
  styleUrls: ['./prod.component.css']
})
export class ProdComponent implements OnInit {
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
}

