import { CityModel } from '@app/shared/datas/model/city-model';
import { CountyResponseData } from '@app/shared/datas/api-model/county-response';

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
