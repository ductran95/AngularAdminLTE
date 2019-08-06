import { Injectable } from '@angular/core';
import * as _ from 'lodash';

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
    if (key.includes('.')) {
      const keys = key.split('.');
      const objectName = keys[0];
      keys.splice(0, 1);
      const propertyPath = keys.join('.');
      let object = this.getLocal(objectName);
      if (object == undefined) {
        object = {};
      }
      _.set(object, propertyPath, data);
      localStorage.setItem(objectName, JSON.stringify(object));
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  getLocal(key: string) {
    if (key.includes('.')) {
      const keys = key.split('.');
      const objectName = keys[0];
      keys.splice(0, 1);
      const propertyPath = keys.join('.');
      const object = localStorage.getItem(objectName);
      if (object != undefined) {
        const data = JSON.parse(object);
        return _.get(data, propertyPath);
      }
      return undefined;
    } else {
      const data = localStorage.getItem(key);
      if (data != undefined) {
        return JSON.parse(data);
      } else {
        return undefined;
      }
    }
  }

  clearLocal(key: string) {
    if (key.includes('.')) {
      const keys = key.split('.');
      const objectName = keys[0];
      keys.splice(0, 1);
      const propertyPath = keys.join('.');
      let object = this.getLocal(objectName);
      if (object != undefined) {
        object = _.omit(object, propertyPath);
        this.saveLocal(objectName, object);
      }
    } else {
      localStorage.removeItem(key);
    }
  }

  saveSession(key: string, data: any) {
    if (key.includes('.')) {
      const keys = key.split('.');
      const objectName = keys[0];
      keys.splice(0, 1);
      const propertyPath = keys.join('.');
      let object = this.getSession(objectName);
      if (object == undefined) {
        object = {};
      }
      _.set(object, propertyPath, data);
      sessionStorage.setItem(objectName, JSON.stringify(object));
    } else {
      sessionStorage.setItem(key, JSON.stringify(data));
    }
  }

  getSession(key: string) {
    if (key.includes('.')) {
      const keys = key.split('.');
      const objectName = keys[0];
      keys.splice(0, 1);
      const propertyPath = keys.join('.');
      const object = sessionStorage.getItem(objectName);
      if (object != undefined) {
        const data = JSON.parse(object);
        return _.get(data, propertyPath);
      }
      return undefined;
    } else {
      const data = sessionStorage.getItem(key);
      if (data != undefined) {
        return JSON.parse(data);
      } else {
        return undefined;
      }
    }
  }

  clearSession(key: string) {
    if (key.includes('.')) {
      const keys = key.split('.');
      const objectName = keys[0];
      keys.splice(0, 1);
      const propertyPath = keys.join('.');
      let object = this.getSession(objectName);
      if (object != undefined) {
        object = _.omit(object, propertyPath);
        this.saveLocal(objectName, object);
      }
    } else {
      sessionStorage.removeItem(key);
    }
  }

  //#endregion
}
