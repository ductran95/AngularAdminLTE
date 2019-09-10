import {Injectable} from '@angular/core';
import {ID} from '@datorama/akita';
import {HttpClient} from '@angular/common/http';
import {UserStore} from './user.store';
import {createUser, createUserFromResponse, UserModel} from './user.model';
import {map, tap} from 'rxjs/operators';
import {UserApiService} from '@app/core/stores/user/user.api-service';
import * as _ from 'lodash';
import {UserRequest} from '@app/core/stores/user/user.api-model';

@Injectable({providedIn: 'root'})
export class UserService {

    constructor(private userStore: UserStore,
                private userApiService: UserApiService) {
    }

    get() {
        return this.userApiService.getAll().pipe(
            map(
                response => {
                    if (response.statusCode == 200 && response.data != null) {
                        const entities = _.map(response.data, item => createUserFromResponse(item));
                        this.userStore.set(entities);
                        return response.message || 'Get user success!';
                    } else {
                        throw Error('Get user fail!');
                    }
                },
                error => {
                    throw Error('Get user fail!');
                }
            )
        );
    }

    add(user: UserModel) {
        const request = new UserRequest(user);
        return this.userApiService.add(request).pipe(
            map(
                response => {
                    if (response.statusCode == 200) {
                        this.userStore.add(user);
                    } else {
                        throw Error('Add user fail!');
                    }
                },
                error => {
                    throw Error('Add user fail!');
                }
            )
        );
    }

    update(id, user: Partial<UserModel>) {
        const model = createUser(user);
        model.id = id;
        const request = new UserRequest(model);
        return this.userApiService.update(request).pipe(
            map(
                response => {
                    if (response.statusCode == 200) {
                        this.userStore.update(id, user);
                    } else {
                        throw Error('Update user fail!');
                    }
                },
                error => {
                    throw Error('Update user fail!');
                }
            )
        );
    }

    remove(id: ID) {
        return this.userApiService.delete(Number(id)).pipe(
            map(
                response => {
                    if (response.statusCode == 200) {
                        this.userStore.remove(id);
                    } else {
                        throw Error('Delete user fail!');
                    }
                },
                error => {
                    throw Error('Delete user fail!');
                }
            )
        );
    }
}
