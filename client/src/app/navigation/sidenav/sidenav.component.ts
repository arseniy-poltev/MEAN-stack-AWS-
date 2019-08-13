import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() toggle = new EventEmitter();
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
  onToggle() {
    this.toggle.emit();
  }

}
