import { Injectable } from '@angular/core';
import { City } from './city.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface CityState extends EntityState<City> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'city' })
export class CityStore extends EntityStore<CityState> {

  constructor() {
    super();
  }

}

