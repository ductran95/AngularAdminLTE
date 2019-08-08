import { Component, OnInit } from '@angular/core';
import { mainMenu } from '@app/shared/constants/mainMenu';

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

  menu: any[];

  //#endregion

  //#region Constructors

  constructor() { }

  //#endregion

  //#region OnInit

  ngOnInit() {
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });

    this.menu = mainMenu;
  }

  //#endregion

  //#region Funtions

  //#endregion

}
