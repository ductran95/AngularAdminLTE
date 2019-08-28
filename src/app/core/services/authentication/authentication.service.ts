import { Injectable } from '@angular/core';
import { LoginModel } from '@app/core/models/data/login-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { apiUrls } from '@app/core/constants/apiUrls';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from '@app/core/services/common/local-storage.service';
import { LoginRequest } from '@app/core/models/api-data/login-request';
import { LoginResponse } from '@app/core/models/api-data/login-response';
import { UserModel } from '@app/core/models/data/user-model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    //#region Inputs, Outputs

    //#endregion

    //#region Properties

    private _baseUrl = environment.baseUrl;
    private _apiUrl = apiUrls.user;
    private _jwtSecret: string;
    private _user: UserModel;

    //#endregion

    //#region Constructors

    constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
        const jwtSecret = this.localStorageService.getLocal('_jwtSecret');
        const user = this.localStorageService.getLocal('_user');
        if (jwtSecret && user) {
            this._jwtSecret = jwtSecret;
            this._user = user;
        }
    }

    //#endregion

    //#region Funtions

    logIn(loginParam: LoginModel): Observable<boolean> {
        const requestParams = new LoginRequest(loginParam);
        return this.http.post<LoginResponse>(this._baseUrl + this._apiUrl.login, requestParams).pipe(
            map(
                (resp: LoginResponse) => {
                    if (resp.statusCode == 200 && resp.data.token) {
                        this._jwtSecret = resp.data.token;
                        this._user = new UserModel(resp.data.user);
                        if (loginParam.remember) {
                            this.localStorageService.saveLocal('_jwtSecret', this._jwtSecret);
                            this.localStorageService.saveLocal('_user', this._user);
                        }
                        return true;
                    } else {
                        this._jwtSecret = null;
                        throw Error(resp.message);
                    }
                },
                error => {
                    this._jwtSecret = null;
                    throw Error('Login fail!');
                })
        );
    }

    logOut() {
        this._jwtSecret = null;
        this.localStorageService.clearLocal('_jwtSecret');
        this.localStorageService.clearLocal('_user');
    }

    isAuthenticated(): boolean {
        return this._jwtSecret != null;
    }

    get jwt(): string {
        return this._jwtSecret;
    }

    get user(): UserModel {
        return this._user;
    }

    //#endregion
}
