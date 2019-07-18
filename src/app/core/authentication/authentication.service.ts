import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { apiUrls } from '@app/shared/constants/apiUrls';
import { LogInParam } from '@app/shared/models/params/log-in-param';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //#region Inputs, Outputs

  //#endregion

  //#region Properties

  private baseUrl = environment.baseUrl;
  private apiUrl = apiUrls.user;
  private _jwtSecret: string;

  //#endregion

  //#region Constructors

  constructor(private http: HttpClient) { }

  //#endregion

  //#region OnInit

  ngOnInit() {
  }

  //#endregion

  //#region Funtions

  logIn(loginParam: LogInParam): Observable<boolean> {
    return this.http.post<LogInParam>(this.baseUrl + this.apiUrl.login, loginParam).pipe(
      map((resp: any) => {
        this._jwtSecret = resp;
        return true;
      },
        error => {
          this._jwtSecret = null;
          return false;
        })
    );
  }

  logOut() {
    this._jwtSecret = null;
  }

  isAuthenticated(): boolean {
    return this._jwtSecret != null;
  }

  getJwt() : string {
    return this._jwtSecret;
  }

  //#endregion
}
