import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {UserModel} from '@app/core/stores/user/user.model';
import {AuthQuery} from '@app/core/stores/auth/auth.query';
import {AuthService} from '@app/core/stores/auth/auth.service';

@Component({
    selector: 'main-layout-header',
    templateUrl: './main-layout-header.component.html',
    styleUrls: ['./main-layout-header.component.scss']
})
export class MainLayoutHeaderComponent implements OnInit {

    //#region Inputs, Outputs

    //#endregion

    //#region Properties

    user$: Observable<UserModel>;

    //#endregion

    //#region Constructors

    constructor(private authQuery: AuthQuery, private authService: AuthService) { }

    //#endregion

    //#region OnInit

    ngOnInit() {
        this.user$ = this.authQuery.user$;
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
        this.authService.logout();
        location.reload();
    }

    //#endregion

}
