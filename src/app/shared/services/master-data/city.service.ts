import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getById(id: number) {
    const data = new HttpParams().append('id', id.toString());
    return this.http.get(this.baseUrl + this.apiUrl.getById, { params: data });
  }

  add(city: City) {
    return this.http.post<City>(this.baseUrl + this.apiUrl.add, city);
  }

  update(city: City) {
    return this.http.put<City>(this.baseUrl + this.apiUrl.update, city);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + this.apiUrl.delete + '/' + id);
  }

  //#endregion
}
