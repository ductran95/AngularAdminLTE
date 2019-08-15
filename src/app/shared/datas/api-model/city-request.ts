import { CityModel } from '@app/shared/datas/model/city-model';

export class CityRequest {
    constructor(model: CityModel) {
        this.id = model.id;
        this.name = model.name;
    }

    id: number;
    name: string;
}
