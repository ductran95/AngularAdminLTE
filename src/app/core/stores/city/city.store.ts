import { Injectable } from '@angular/core';
import { CityModel } from './city.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface CityState extends EntityState<CityModel> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'city' })
export class CityStore extends EntityStore<CityState> {

  constructor() {
    super();
  }

}

