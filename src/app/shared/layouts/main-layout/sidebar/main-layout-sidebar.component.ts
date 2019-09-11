import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@app/core/services/layout.service';
import { SidebarItemModel } from '@app/core/models/sidebar-item-model';
import {AuthQuery} from '@app/core/stores/auth/auth.query';
import {Observable} from 'rxjs';
import {UserModel} from '@app/core/stores/user/user.model';

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
    user$: Observable<UserModel>;

    //#endregion

    //#region Constructors

    constructor(private layoutService: LayoutService, private authQuery: AuthQuery) { }

    //#endregion

    //#region OnInit

    ngOnInit() {
        this.layoutService.getSidebarMenu().subscribe(
            resp => {
                this.sidebarMenu = resp;
            }
        );

        this.user$ = this.authQuery.user$;

        $(document).ready(() => {
            const trees: any = $('[data-widget="tree"]');
            trees.tree();
        });
    }

    //#endregion

    //#region Funtions

    //#endregion

}
