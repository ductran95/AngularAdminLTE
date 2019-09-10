import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {apiUrls} from '@app/core/constants/apiUrls';
import {environment} from '@env/environment';
import {CountyListResponse, CountyRequest, CountyResponse} from '@app/core/stores/county/county.api-model';
import {BaseResponse} from '@app/core/models/base-response';

@Injectable({
    providedIn: 'root'
})
export class CountyApiService {

    //#region Properties

    private baseUrl = environment.baseUrl;
    private apiUrl = apiUrls.county;

    //#endregion

    //#region Constructors

    constructor(private http: HttpClient) { }

    //#endregion

    //#region Functions

    getAll() {
        return this.http.get<CountyListResponse>(this.baseUrl + this.apiUrl.getAll);
    }

    getById(id: number) {
        const data = new HttpParams().append('Id', id.toString());
        return this.http.get<CountyResponse>(this.baseUrl + this.apiUrl.getById, { params: data });
    }

    add(user: CountyRequest) {
        return this.http.post<BaseResponse>(this.baseUrl + this.apiUrl.add, user);
    }

    update(user: CountyRequest) {
        return this.http.put<BaseResponse>(this.baseUrl + this.apiUrl.update, user);
    }

    delete(id: number) {
        return this.http.delete<BaseResponse>(this.baseUrl + this.apiUrl.delete + '/' + id);
    }

    //#endregion
}
