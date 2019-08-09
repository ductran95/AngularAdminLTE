import { Component, OnInit } from '@angular/core';
import { SidebarItem } from '@app/shared/models/common/sidebar-item';
import { LayoutService } from '@app/shared/services/common/layout.service';

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

  sidebarMenu: SidebarItem[];

  //#endregion

  //#region Constructors

  constructor(private layoutService: LayoutService) { }

  //#endregion

  //#region OnInit

  ngOnInit() {
    this.layoutService.getSidebarMenu().subscribe(
      (sidebarMenu: SidebarItem[]) => {
        this.sidebarMenu = sidebarMenu;
      }
    );

    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
  }

  //#endregion

  //#region Funtions

  //#endregion

}
