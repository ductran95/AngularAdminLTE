import { CityResponseData } from '@app/shared/datas/api-model/city-response';

export class CityModel {
    constructor();
    constructor(response: CityResponseData);
    constructor(response?: CityResponseData) {
        this.id = response ? response.id : null;
        this.name = response ? response.name : null;
    }

    id: number;
    name: string;
}
