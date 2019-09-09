import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';
import { environment } from '@env/environment';
import { apiUrls } from '@app/core/constants/apiUrls';
import { AuthApiService } from '@app/core/stores/auth/auth.api-service';
import {AuthQuery} from '@app/core/stores/auth/auth.query';


@Injectable({
    providedIn: 'root'
})


export class AuthenticationInterceptor implements HttpInterceptor {

    //#region Properties

    //#endregion

    //#region Constructors

    constructor(private authQuery: AuthQuery) { }

    //#endregion

    //#region Funtions

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        req = req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authQuery.getJwt()
            }
        });

        return next.handle(req);
    }

    //#endregion
}
