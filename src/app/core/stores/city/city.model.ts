import { ID } from '@datorama/akita';
import {CityResponseData} from '@app/core/stores/city/city.api-model';

export interface CityModel {
  id: ID;
  name: string;
}

/**
 * A factory function that creates City
 */
export function createCity(params: Partial<CityModel>) {
  return {
      id: params.id || null,
      name: params.name || null,
  } as CityModel;
}

export function createCityFromResponse(params: CityResponseData) {
    return {
        id: params.id,
        name: params.name
    } as CityModel;
}
