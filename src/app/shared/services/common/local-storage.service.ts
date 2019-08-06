import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  //#region Properties


  //#endregion

  //#region Constructors

  constructor() { }

  //#endregion

  //#region Funtions

  saveLocal(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getLocal(key: string) {
    const data = localStorage.getItem(key);
    if (data != undefined) {
      return JSON.parse(data);
    } else {
      return undefined;
    }
  }

  clearLocal(key: string) {
    localStorage.removeItem(key);
  }

  saveSession(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  getSession(key: string) {
    const data = sessionStorage.getItem(key);
    if (data != undefined) {
      return JSON.parse(data);
    } else {
      return undefined;
    }
  }

  clearSession(key: string) {
    sessionStorage.removeItem(key);
  }

  //#endregion
}
