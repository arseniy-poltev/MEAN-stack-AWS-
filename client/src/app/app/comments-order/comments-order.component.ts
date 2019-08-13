import { Component, OnInit, Input, Inject } from '@angular/core';
import { IComment } from 'src/app/models/comment.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderService } from 'src/app/services/order.service';
import { IOrder } from 'src/app/models/order.model';
import { OrderStates, Roles } from 'src/app/utils/enums.utils';


@Component({
  selector: 'app-comments-order',
  templateUrl: './comments-order.component.html',
  styleUrls: ['./comments-order.component.css']
})
export class CommentsOrderComponent implements OnInit {
  comments: IComment[];
  order: IOrder;
  comment: string;
  showActions:boolean = true;
  

  constructor(
    public dialogRef: MatDialogRef<CommentsOrderComponent>,
    public orderClient: OrderService,
    
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.order = data.order;
  }

  ngOnInit() {   
    if (this.order !== null) {
      this.comments = this.order.comments
      if(this.data.user.rol === Roles.Prod){
        this.showActions = false
      }
    }
  }
  onSubmit(){
    if(this.comment !== null && this.comment !== undefined){
      if(this.comment.trim().length > 0){
        this.comments.push({
          user: this.data.user,
          comment: this.comment
        })        
        this.orderClient.update(this.data.token, this.data.config, this.order).subscribe((newOrder) => {          
          this.dialogRef.close();
        });
      }else{
        this.dialogRef.close();
      }      
    }else{      
      this.dialogRef.close();
    }
  }

}
