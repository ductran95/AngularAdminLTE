import { CountyModel } from '@app/shared/datas/model/county-model';

export class CountyRequest {
    constructor(model: CountyModel) {
        this.id = model.id;
        this.countyName = model.name;
        this.id = model.city.id;
    }

    id: number;
    countyName: string;
    cityId: number;
}
