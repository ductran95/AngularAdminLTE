import {ID} from '@datorama/akita';
import {CityModel, createCity} from '@app/core/stores/city/city.model';
import {CityResponseData} from '@app/core/stores/city/city.api-model';
import {CountyResponseData} from '@app/core/stores/county/county.api-model';

export interface CountyModel {
    id: ID;
    name: string;
    city: CityModel;
}

/**
 * A factory function that creates County
 */
export function createCounty(params: Partial<CountyModel>) {
    return {
        id: params.id || null,
        name: params.name || null,
        city: params.city || null,
    } as CountyModel;
}

export function createCountyFromResponse(params: CountyResponseData) {
    return {
        id: params.id,
        name: params.countyName,
        city: createCity({id: params.cityId})
    } as CountyModel;
}
