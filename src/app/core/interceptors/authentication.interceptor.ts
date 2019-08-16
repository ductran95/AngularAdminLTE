import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';
import { environment } from '@env/environment';
import { apiUrls } from '@app/core/constants/apiUrls';
import { AuthenticationService } from '@app/core/services/authentication/authentication.service';


@Injectable({
  providedIn: 'root'
})


export class AuthenticationInterceptor implements HttpInterceptor {

  //#region Properties

  //#endregion

  //#region Constructors

  constructor(private authService: AuthenticationService) { }

  //#endregion

  //#region Funtions

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.jwt
      }
    });

    return next.handle(req);
  }

  //#endregion
}
