import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'main-layout-page-header',
    templateUrl: './main-layout-page-header.component.html',
    styleUrls: ['./main-layout-page-header.component.scss']
})
export class MainLayoutPageHeaderComponent implements OnInit {

    //#region Inputs

    @Input() title: string;
    @Input() description: string;

    //#endregion

    //#region Properties

    //#endregion

    //#region Constructors

    constructor() { }

    //#endregion

    //#region OnInit

    ngOnInit() { }

    //#endregion

    //#region Funtions

    //#endregion

}
