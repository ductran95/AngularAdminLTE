import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/core/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  //#region Constructors

  constructor(private router: Router, private authService: AuthenticationService) { }

  //#endregion

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }

  }

}
