import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})



export class AuthenticationInterceptor implements HttpInterceptor {

  //#region Properties

  //#endregion

  //#region Funtions

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    req = req.clone({
      setHeaders: {
        'Content-Type':  'application/json',
      }
    });

    return next.handle(req);
  }

  //#endregion
}