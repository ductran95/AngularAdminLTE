import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/authentication/authentication.service';

@Component({
  selector: 'main-layout-header',
  templateUrl: './main-layout-header.component.html',
  styleUrls: ['./main-layout-header.component.scss']
})
export class MainLayoutHeaderComponent implements OnInit {

  //#region Inputs, Outputs

  //#endregion

  //#region Properties

  //#endregion

  //#region Constructors

  constructor(private router: Router, private authService: AuthenticationService) { }

  //#endregion

  //#region OnInit

  ngOnInit() {}

  //#endregion

  //#region Funtions

  toggleMessageMenu() {
    $('.dropdown.messages-menu .dropdown-menu').dropdown("toggle");
  }

  toggleNotificationMenu() {
    $('.dropdown.notifications-menu .dropdown-menu').dropdown("toggle");
  }

  toggleTaskMenu() {
    $('.dropdown.tasks-menu .dropdown-menu').dropdown("toggle");
  }

  toggleUserMenu() {
    $('.dropdown.user.user-menu .dropdown-menu').dropdown("toggle");
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['']);
  }
  
  //#endregion

}
