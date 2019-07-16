import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { apiUrls } from '@app/shared/constants/apiUrls';
import { County } from '@app/shared/models/master-data/county';

@Injectable({
  providedIn: 'root'
})
export class CountyService {

  //#region Properties

  private baseUrl = environment.baseUrl;
  private apiUrl = apiUrls.county;

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

  add(county: County) {
    return this.http.post<County>(this.baseUrl + this.apiUrl.add, county);
  }

  update(county: County) {
    return this.http.put<County>(this.baseUrl + this.apiUrl.update, county);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + this.apiUrl.delete + '/' + id);
  }

  //#endregion
}
