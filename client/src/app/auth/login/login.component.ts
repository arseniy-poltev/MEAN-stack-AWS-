import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import { CommonUtils } from 'src/app/utils/common.utils';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/models/user.model';
import { SharedService } from 'src/app/services/shared.service';
import { timer } from 'rxjs/observable/timer';
import { IConfig } from 'src/app/models/config.model';
import { IToken } from 'src/app/models/token.model';
import { Roles } from 'src/app/utils/enums.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userIsValid: boolean;
  user: IUser;
  config: IConfig;
  token: IToken;

  constructor(private router: Router,
    private common: CommonUtils,
    private userClient: UserService,
    private sharedClient: SharedService,
    private route: Router) { }

  ngOnInit() {
    this.sharedClient.token.subscribe((token) => {
      this.token = token;
    });
    this.sharedClient.config.subscribe((config) => {
      this.config = config;
    });
    this.sharedClient.user.subscribe((currentUser) => {
      this.user = currentUser;
    });
  }
  validateUserNavigation() {
    switch (this.user.rol) {
      case Roles.Admin: this.route.navigate(['/Admin']); break;
      case Roles.Design: this.route.navigate(['/Design']); break;
      case Roles.Prod: this.route.navigate(['/Prod']); break;
      case Roles.Store: this.route.navigate(['/Store']); break;
      default: {
        this.sharedClient.notify({
          message: 'Not allowed',
          action: 'login'
        });
      } break;
    }
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.sharedClient.changePageState(true);
    const email = form.controls.email.value;
    const password =  this.common.createHash(form.controls.password.value);
    const user: IUser = {
      mail: email,
      password: password
    };
    this.userClient.validateLogin(user, this.config, this.token).subscribe((resp) => {
      this.sharedClient.changePageState(false);
      if (resp != null) {
        this.sharedClient.changeUser(resp);
        this.user = resp;
        this.validateUserNavigation();
      } else {
        form.resetForm();
        this.sharedClient.notify({
          message: 'invalid user or password',
          action: 'login'
        });
      }
    });
  }
}
