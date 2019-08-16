import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication/authentication.service';
import { UserModel } from '@app/core/models/data/user-model';

@Component({
  selector: 'main-layout-header',
  templateUrl: './main-layout-header.component.html',
  styleUrls: ['./main-layout-header.component.scss']
})
export class MainLayoutHeaderComponent implements OnInit {

  //#region Inputs, Outputs

  //#endregion

  //#region Properties

  user: UserModel;

  //#endregion

  //#region Constructors

  constructor(private authService: AuthenticationService) { }

  //#endregion

  //#region OnInit

  ngOnInit() {
    this.user = this.authService.user;
  }

  //#endregion

  //#region Funtions

  toggleMessageMenu() {
    $('.dropdown.messages-menu .dropdown-menu').dropdown('toggle');
  }

  toggleNotificationMenu() {
    $('.dropdown.notifications-menu .dropdown-menu').dropdown('toggle');
  }

  toggleTaskMenu() {
    $('.dropdown.tasks-menu .dropdown-menu').dropdown('toggle');
  }

  toggleUserMenu() {
    $('.dropdown.user.user-menu .dropdown-menu').dropdown('toggle');
  }

  logOut() {
    this.authService.logOut();
    location.reload();
  }

  //#endregion

}
