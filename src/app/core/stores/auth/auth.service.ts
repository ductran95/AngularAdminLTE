import { Injectable } from '@angular/core';
import { AuthStore } from './auth.store';
import {map, tap} from 'rxjs/operators';
import {AuthApiService} from '@app/core/stores/auth/auth.api-service';
import {LoginModel} from '@app/core/stores/auth/login.model';
import {LoginRequest, LoginResponse} from '@app/core/stores/auth/login.api-model';
import {createUserFromResponse} from '@app/core/stores/user/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private authStore: AuthStore,
              private authApiService: AuthApiService) {
  }

    login(loginParam: LoginModel) {
        const requestParams = new LoginRequest(loginParam);
        return this.authApiService.login(requestParams).pipe(
            map(
                response => {
                    if (response.statusCode == 200 && response.data.token) {
                        const authState = {
                            jwtSecret: response.data.token,
                            user: createUserFromResponse(response.data.user)
                        }
                        this.authStore.login(authState);
                        if (loginParam.remember) {
                            this.authStore.saveToLocalStorage(authState);
                        }
                        return true;
                    } else {
                        this.authStore.logout();
                        throw Error(response.message);
                    }
                },
                error => {
                    this.authStore.logout();
                    throw Error('Login fail!');
                })
        );

    }

    logout() {
        this.authStore.logout();
    }
}
