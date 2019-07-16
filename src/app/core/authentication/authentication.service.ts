import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //#region Inputs, Outputs

  //#endregion

  //#region Properties

  private _jwtSecret: any;

  //#endregion

  //#region Constructors

  constructor() { }

  //#endregion

  //#region OnInit

  ngOnInit() {
  }

  //#endregion

  //#region Funtions

  logIn() {
    this._jwtSecret = "logged";
  }

  logOut() {
    this._jwtSecret = null;
  }

  isAuthenticated(): boolean {
    return this._jwtSecret != null;
  }

  //#endregion
}
