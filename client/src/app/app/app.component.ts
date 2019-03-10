import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userActive: boolean;
  isLoad: boolean;
  loadingPage: boolean;
  constructor(
    private sharedClient: SharedService,
    public matSnack: MatSnackBar
  ) {}
  ngOnInit() {
    this.sharedClient.socket.subscribe((emit) => {
    });

    this.loadingPage = true;
    this.sharedClient.token.subscribe((token) => {
      if (token != null) {
        this.isLoad = true;
      }
    });
    this.sharedClient.loadingPage.subscribe((result) => {
      this.loadingPage = result;
    });
    this.sharedClient.message.subscribe((message) => {
      if (message != null) {
        this.matSnack.open(message.message, message.action, {
          duration: 2000
        });
      }
    });
  }
}
