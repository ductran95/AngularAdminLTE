import { CityModel } from '@app/core/models/data/city-model';

export class CityRequest {
    constructor(model: CityModel) {
        this.id = model.id;
        this.name = model.name;
    }

    id: number;
    name: string;
}
