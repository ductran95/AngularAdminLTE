import { Injectable } from '@angular/core';
import { CountyModel } from './county.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface CountyState extends EntityState<CountyModel> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'county' })
export class CountyStore extends EntityStore<CountyState> {

  constructor() {
    super();
  }

}

