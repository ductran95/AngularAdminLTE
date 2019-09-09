import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { UserStore } from './user.store';
import { User } from './user.model';
import { tap } from 'rxjs/operators';
import {UserApiService} from '@app/core/stores/user/user.api-service';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private userStore: UserStore,
              private userApiService: UserApiService) {
  }

  get() {
    return this.userApiService.getAll().pipe(tap(entities => {
      this.userStore.set(entities);
    }));
  }

  add(user: User) {
    this.userStore.add(user);
  }

  update(id, user: Partial<User>) {
    this.userStore.update(id, user);
  }

  remove(id: ID) {
    this.userStore.remove(id);
  }
}
