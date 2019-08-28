import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrls } from '@app/core/constants/apiUrls';
import { CountyModel } from '@app/core/models/data/county-model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { CountyResponse } from '@app/core/models/api-data/county-response';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { CountyRequest } from '@app/core/models/api-data/county-request';

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

    getAll(): Observable<CountyModel[]> {
        return this.http.get<CountyResponse>(this.baseUrl + this.apiUrl.getAll).pipe(
            map(
                resp => {
                    if (resp.statusCode == 200) {
                        return _.map(resp.data, item => new CountyModel(item));
                    }
                    throw Error(resp.message);
                },
                error => { throw Error('Cannot get counties!'); }
            )
        );
    }

    getById(id: number): Observable<CountyModel> {
        const data = new HttpParams().append('Id', id.toString());
        return this.http.get<CountyResponse>(this.baseUrl + this.apiUrl.getById, { params: data }).pipe(
            map(
                resp => {
                    if (resp.statusCode == 200 && resp.data.length > 0) {
                        return new CountyModel(resp[0]);
                    }
                    throw Error(resp.message);
                },
                error => { throw Error('Cannot get county!'); }
            )
        );
    }

    add(county: CountyModel): Observable<string> {
        const requestParams = new CountyRequest(county);
        return this.http.post<CountyResponse>(this.baseUrl + this.apiUrl.add, requestParams).pipe(
            map(
                resp => {
                    if (resp.statusCode == 200) {
                        return resp.message;
                    }
                    throw Error(resp.message);
                },
                error => { throw Error('Cannot add county!'); }
            )
        );
    }

    update(county: CountyModel) {
        const requestParams = new CountyRequest(county);
        return this.http.put<CountyResponse>(this.baseUrl + this.apiUrl.update, requestParams).pipe(
            map(
                resp => {
                    if (resp.statusCode == 200) {
                        return resp.message;
                    }
                    throw Error(resp.message);
                },
                error => { throw Error('Cannot update county!'); }
            )
        );
    }

    delete(id: number) {
        return this.http.delete<CountyResponse>(this.baseUrl + this.apiUrl.delete + '/' + id).pipe(
            map(
                resp => {
                    if (resp.statusCode == 200) {
                        return resp.message;
                    }
                    throw Error(resp.message);
                },
                error => { throw Error('Cannot delete county!'); }
            )
        );
    }

    //#endregion
}
