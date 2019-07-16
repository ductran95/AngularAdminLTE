import { Component, OnInit } from '@angular/core';

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
  }

  //#endregion

  //#region Funtions

  //#endregion

}
