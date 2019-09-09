import {Injectable} from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import {UserModel} from '@app/core/stores/user/user.model';
import {LocalStorageService} from '@app/core/services/common/local-storage.service';

// tslint:disable-next-line:no-empty-interface
export interface AuthState {
    jwtSecret: string;
    user: UserModel;
}

/**
 * A factory function that creates Auth
 */
export function createAuth(localStorageService: LocalStorageService) {
    const auth = this.localStorageService.getLocal('auth');
    if (auth) {
        return {
            jwtSecret: auth.jwtSecret,
            user: auth.user
        } as AuthState;
    } else {
        return {
            jwtSecret: null,
            user: null
        } as AuthState;
    }

}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'auth'})
export class AuthStore extends Store<AuthState> {

    constructor(private localStorageService: LocalStorageService) {
        super(createAuth(localStorageService));
    }

    login(authState: AuthState) {
        this.update(authState);
    }

    logout() {
        this.clearLocalStorage();
        this.update(createAuth(this.localStorageService));
    }

    saveToLocalStorage(authState: AuthState) {
        this.localStorageService.saveLocal('auth', authState);
    }

    clearLocalStorage() {
        this.localStorageService.clearLocal('auth');
    }
}

