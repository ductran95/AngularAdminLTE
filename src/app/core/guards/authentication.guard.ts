import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthQuery} from '@app/core/stores/auth/auth.query';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

    //#region Constructors

    constructor(private router: Router, private authQuery: AuthQuery) { }

    //#endregion

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.authQuery.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }

    }

}
