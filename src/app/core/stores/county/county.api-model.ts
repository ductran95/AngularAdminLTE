import {BaseResponse} from '@app/core/models/base-response';
import {CountyModel} from '@app/core/stores/county/county.model';

//#region Requests

export class CountyRequest {
    constructor(model: CountyModel) {
        this.id = Number(model.id);
        this.countyName = model.name;
        this.cityId = Number(model.city.id);
    }

    id: number;
    countyName: string;
    cityId: number;
}

//#endregion

//#region Responses

export class CountyListResponse extends BaseResponse {
    data: CountyResponseData[];
}

export class CountyResponse extends BaseResponse {
    data: CountyResponseData;
}

export class CountyResponseData {
    id: number;
    countyName: string;
    cityId: number;
}

//#endregion
