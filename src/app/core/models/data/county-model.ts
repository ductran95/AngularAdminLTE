import { CityModel } from '@app/core/models/data/city-model';
import { CountyResponseData } from '@app/core/models/api-data/county-response';

export class CountyModel {
    constructor();
    constructor(response: CountyResponseData);
    constructor(response?: CountyResponseData) {
        this.id = response ? response.id : null;
        this.name = response ? response.countyName : null;
        this.city = {
            id: response ? response.cityId : null,
            name: null
        };
    }

    id: number;
    name: string;
    city: CityModel;
}
