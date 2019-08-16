import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrls } from '@app/core/constants/apiUrls';
import { UserModel } from '@app/core/models/data/user-model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { UserResponse } from '@app/core/models/api-data/user-response';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { UserRequest } from '@app/core/models/api-data/user-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //#region Properties

  private baseUrl = environment.baseUrl;
  private apiUrl = apiUrls.user;

  //#endregion

  //#region Constructors

  constructor(private http: HttpClient) { }

  //#endregion

  //#region Funtions

  getAll(): Observable<UserModel[]> {
    return this.http.get<UserResponse>(this.baseUrl + this.apiUrl.getAll).pipe(
      map(
        resp => {
          if (resp.statusCode == 200) {
            return _.map(resp.data, item => new UserModel(item));
          }
          throw Error(resp.message);
        },
        error => { throw Error('Cannot get users!'); }
      )
    );
  }

  getById(id: number): Observable<UserModel> {
    const data = new HttpParams().append('Id', id.toString());
    return this.http.get<UserResponse>(this.baseUrl + this.apiUrl.getById, { params: data }).pipe(
      map(
        resp => {
          if (resp.statusCode == 200 && resp.data.length > 0) {
            return new UserModel(resp[0]);
          }
          throw Error(resp.message);
        },
        error => { throw Error('Cannot get user!'); }
      )
    );
  }

  add(user: UserModel): Observable<string> {
    const requestParams = new UserRequest(user);
    return this.http.post<UserResponse>(this.baseUrl + this.apiUrl.add, requestParams).pipe(
      map(
        resp => {
          if (resp.statusCode == 200) {
            return resp.message;
          }
          throw Error(resp.message);
        },
        error => { throw Error('Cannot add user!'); }
      )
    );
  }

  update(user: UserModel) {
    const requestParams = new UserRequest(user);
    return this.http.put<UserResponse>(this.baseUrl + this.apiUrl.update, requestParams).pipe(
      map(
        resp => {
          if (resp.statusCode == 200) {
            return resp.message;
          }
          throw Error(resp.message);
        },
        error => { throw Error('Cannot update user!'); }
      )
    );
  }

  delete(id: number) {
    return this.http.delete<UserResponse>(this.baseUrl + this.apiUrl.delete + '/' + id).pipe(
      map(
        resp => {
          if (resp.statusCode == 200) {
            return resp.message;
          }
          throw Error(resp.message);
        },
        error => { throw Error('Cannot delete user!'); }
      )
    );
  }

  //#endregion
}
