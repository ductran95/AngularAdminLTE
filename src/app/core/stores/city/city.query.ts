import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CityStore, CityState } from './city.store';

@Injectable({ providedIn: 'root' })
export class CityQuery extends QueryEntity<CityState> {

  constructor(protected store: CityStore) {
    super(store);
  }

}
