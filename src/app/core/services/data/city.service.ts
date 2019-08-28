import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrls } from '@app/core/constants/apiUrls';
import { CityModel } from '@app/core/models/data/city-model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { CityResponse } from '@app/core/models/api-data/city-response';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { CityRequest } from '@app/core/models/api-data/city-request';

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

    getAll(): Observable<CityModel[]> {
        return this.http.get<CityResponse>(this.baseUrl + this.apiUrl.getAll).pipe(
            map(
                resp => {
                    if (resp.statusCode == 200) {
                        return _.map(resp.data, item => new CityModel(item));
                    }
                    throw Error(resp.message);
                },
                error => { throw Error('Cannot get cities!'); }
            )
        );
    }

    getById(id: number): Observable<CityModel> {
        const data = new HttpParams().append('id', id.toString());
        return this.http.get<CityResponse>(this.baseUrl + this.apiUrl.getById, { params: data }).pipe(
            map(
                resp => {
                    if (resp.statusCode == 200 && resp.data.length > 0) {
                        return new CityModel(resp[0]);
                    }
                    throw Error(resp.message);
                },
                error => { throw Error('Cannot get city!'); }
            )
        );
    }

    add(city: CityModel): Observable<string> {
        const requestParams = new CityRequest(city);
        return this.http.post<CityResponse>(this.baseUrl + this.apiUrl.add, requestParams).pipe(
            map(
                resp => {
                    if (resp.statusCode == 200) {
                        return resp.message;
                    }
                    throw Error(resp.message);
                },
                error => { throw Error('Cannot add city!'); }
            )
        );
    }

    update(city: CityModel) {
        const requestParams = new CityRequest(city);
        return this.http.put<CityResponse>(this.baseUrl + this.apiUrl.update, requestParams).pipe(
            map(
                resp => {
                    if (resp.statusCode == 200) {
                        return resp.message;
                    }
                    throw Error(resp.message);
                },
                error => { throw Error('Cannot update city!'); }
            )
        );
    }

    delete(id: number) {
        return this.http.delete<CityResponse>(this.baseUrl + this.apiUrl.delete + '/' + id).pipe(
            map(
                resp => {
                    if (resp.statusCode == 200) {
                        return resp.message;
                    }
                    throw Error(resp.message);
                },
                error => { throw Error('Cannot delete city!'); }
            )
        );
    }

    //#endregion
}
