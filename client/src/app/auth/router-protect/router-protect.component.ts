import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { IUser } from 'src/app/models/user.model';
import { Roles } from 'src/app/utils/enums.utils';

@Component({
  selector: 'app-router-protect',
  templateUrl: './router-protect.component.html',
  styleUrls: ['./router-protect.component.css']
})
export class RouterProtectComponent implements OnInit {
  user: IUser;
  constructor(
    private sharedClient: SharedService,
    private route: Router
  ) { }

  ngOnInit() {
    this.sharedClient.user.subscribe((currentUser) => {
      this.user = currentUser;
      this.validateUser();
    });
  }
  validateUser() {
    let userIsValid = false;
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.route.url.indexOf('Login') === -1) {
        if (this.user !== null) {
          userIsValid = (this.user.rol === Roles.Admin)
          || (this.route.url.indexOf('Prod') !== -1 && this.user.rol === Roles.Prod)
          || (this.route.url.indexOf('Store') !== -1 && this.user.rol === Roles.Store)
          || (this.route.url.indexOf('Design') !== -1 && this.user.rol === Roles.Design);
        }
        if (!userIsValid) {
          this.route.navigate(['/Auth']);
        }
    }
      }
    });
  }

}
