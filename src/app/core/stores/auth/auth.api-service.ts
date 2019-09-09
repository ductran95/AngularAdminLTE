import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { apiUrls } from '@app/core/constants/apiUrls';
import { Observable } from 'rxjs';
import {LoginRequest, LoginResponse} from '@app/core/stores/auth/login.api-model';

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {

    //#region Inputs, Outputs

    //#endregion

    //#region Properties

    private _baseUrl = environment.baseUrl;
    private _apiUrl = apiUrls.user;

    //#endregion

    //#region Constructors

    constructor(private http: HttpClient) {}

    //#endregion

    //#region Functions

    login(request: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this._baseUrl + this._apiUrl.login, request);
    }

    //#endregion
}
