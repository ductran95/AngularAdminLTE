import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '@app/shared/constants/apiUrls';
import { Observable } from 'rxjs';
import { City } from '@app/shared/models/master-data/city';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  //#region Properties

  private baseUrl = environment.baseUrl;
  private apiUrl = apiUrls.city;

  //#endregion

  //#region Constructors

  constructor(private http: HttpClient) { }

  //#endregion

  //#region Funtions

  getAll() {
    return this.http.get(this.baseUrl + this.apiUrl.getAll);
  }

  //#endregion
}
