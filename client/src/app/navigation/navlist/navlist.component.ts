import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navlist',
  templateUrl: './navlist.component.html',
  styleUrls: ['./navlist.component.css']
})
export class NavlistComponent implements OnInit {
  userActive: boolean;
  constructor(
    private sharedClient: SharedService,
    private router: Router) { }

  ngOnInit() {
    this.sharedClient.user.subscribe((user) => {
      if (user != null) {
        this.userActive = true;
      } else {
        this.userActive = false;
      }
    });
  }
  logout() {
    this.sharedClient.changeUser(null);
    this.router.navigate(['/Auth']);
  }

}
