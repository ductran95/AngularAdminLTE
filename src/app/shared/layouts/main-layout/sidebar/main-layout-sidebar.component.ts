import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@app/core/services/common/layout.service';
import { AuthenticationService } from '@app/core/services/authentication/authentication.service';
import { UserModel } from '@app/core/models/data/user-model';
import { SidebarItemModel } from '@app/core/models/data/sidebar-item-model';

declare var $;

@Component({
  selector: 'main-layout-sidebar',
  templateUrl: './main-layout-sidebar.component.html',
  styleUrls: ['./main-layout-sidebar.component.scss']
})
export class MainLayoutSidebarComponent implements OnInit {

  //#region Inputs

  //#endregion

  //#region Properties

  sidebarMenu: SidebarItemModel[];
  user: UserModel;

  //#endregion

  //#region Constructors

  constructor(private layoutService: LayoutService, private authService: AuthenticationService) { }

  //#endregion

  //#region OnInit

  ngOnInit() {
    this.layoutService.getSidebarMenu().subscribe(
      resp => {
        this.sidebarMenu = resp;
      }
    );

    this.user = this.authService.user;

    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
  }

  //#endregion

  //#region Funtions

  //#endregion

}
