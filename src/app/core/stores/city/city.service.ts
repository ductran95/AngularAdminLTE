import {Injectable} from '@angular/core';
import {ID} from '@datorama/akita';
import {CityStore} from './city.store';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';
import {createCity, createCityFromResponse, CityModel} from '@app/core/stores/city/city.model';
import {CityRequest} from '@app/core/stores/city/city.api-model';
import {CityApiService} from '@app/core/stores/city/city.api-service';

@Injectable({providedIn: 'root'})
export class CityService {

    constructor(private cityStore: CityStore,
                private cityApiService: CityApiService) {
    }

    get() {
        return this.cityApiService.getAll().pipe(
            map(
                response => {
                    if (response.statusCode == 200 && response.data != null) {
                        const entities = _.map(response.data, item => createCityFromResponse(item));
                        this.cityStore.set(entities);
                        return response.message || 'Get city success!';
                    } else {
                        throw Error('Get city fail!');
                    }
                },
                error => {
                    throw Error('Get city fail!');
                }
            )
        );
    }

    add(city: CityModel) {
        const request = new CityRequest(city);
        return this.cityApiService.add(request).pipe(
            map(
                response => {
                    if (response.statusCode == 200) {
                        this.cityStore.add(city);
                    } else {
                        throw Error('Add city fail!');
                    }
                },
                error => {
                    throw Error('Add city fail!');
                }
            )
        );
    }

    update(id, city: Partial<CityModel>) {
        const model = createCity(city);
        model.id = id;
        const request = new CityRequest(model);
        return this.cityApiService.update(request).pipe(
            map(
                response => {
                    if (response.statusCode == 200) {
                        this.cityStore.update(id, city);
                    } else {
                        throw Error('Update city fail!');
                    }
                },
                error => {
                    throw Error('Update city fail!');
                }
            )
        );
    }

    remove(id: ID) {
        return this.cityApiService.delete(Number(id)).pipe(
            map(
                response => {
                    if (response.statusCode == 200) {
                        this.cityStore.remove(id);
                    } else {
                        throw Error('Delete city fail!');
                    }
                },
                error => {
                    throw Error('Delete city fail!');
                }
            )
        );
    }
}
