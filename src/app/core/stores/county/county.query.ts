import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CountyStore, CountyState } from './county.store';

@Injectable({ providedIn: 'root' })
export class CountyQuery extends QueryEntity<CountyState> {

  constructor(protected store: CountyStore) {
    super(store);
  }

}
