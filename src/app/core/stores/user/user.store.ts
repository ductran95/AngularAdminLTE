import { Injectable } from '@angular/core';
import { UserModel } from './user.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface UserState extends EntityState<UserModel> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends EntityStore<UserState> {

  constructor() {
    super();
  }

}

