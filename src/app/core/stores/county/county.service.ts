import {Injectable} from '@angular/core';
import {ID} from '@datorama/akita';
import {CountyStore} from './county.store';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';
import {createCounty, createCountyFromResponse, CountyModel} from '@app/core/stores/county/county.model';
import {CountyRequest} from '@app/core/stores/county/county.api-model';
import {CountyApiService} from '@app/core/stores/county/county.api-service';

@Injectable({providedIn: 'root'})
export class CountyService {

    constructor(private countyStore: CountyStore,
                private countyApiService: CountyApiService) {
    }

    get() {
        return this.countyApiService.getAll().pipe(
            map(
                response => {
                    if (response.statusCode == 200 && response.data != null) {
                        const entities = _.map(response.data, item => createCountyFromResponse(item));
                        this.countyStore.set(entities);
                        return response.message || 'Get county success!';
                    } else {
                        throw Error('Get county fail!');
                    }
                },
                error => {
                    throw Error('Get county fail!');
                }
            )
        );
    }

    add(county: CountyModel) {
        const request = new CountyRequest(county);
        return this.countyApiService.add(request).pipe(
            map(
                response => {
                    if (response.statusCode == 200) {
                        this.countyStore.add(county);
                    } else {
                        throw Error('Add county fail!');
                    }
                },
                error => {
                    throw Error('Add county fail!');
                }
            )
        );
    }

    update(id, county: Partial<CountyModel>) {
        const model = createCounty(county);
        model.id = id;
        const request = new CountyRequest(model);
        return this.countyApiService.update(request).pipe(
            map(
                response => {
                    if (response.statusCode == 200) {
                        this.countyStore.update(id, county);
                    } else {
                        throw Error('Update county fail!');
                    }
                },
                error => {
                    throw Error('Update county fail!');
                }
            )
        );
    }

    remove(id: ID) {
        return this.countyApiService.delete(Number(id)).pipe(
            map(
                response => {
                    if (response.statusCode == 200) {
                        this.countyStore.remove(id);
                    } else {
                        throw Error('Delete county fail!');
                    }
                },
                error => {
                    throw Error('Delete county fail!');
                }
            )
        );
    }
}
