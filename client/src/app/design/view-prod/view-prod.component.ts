import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-view-prod',
  templateUrl: './view-prod.component.html',
  styleUrls: ['./view-prod.component.css']
})
export class ViewProdComponent implements OnInit {  
  user: IUser;

  constructor(
    public dialogRef: MatDialogRef<ViewProdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.user = data.user;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
