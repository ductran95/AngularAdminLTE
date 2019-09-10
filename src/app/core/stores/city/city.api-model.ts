import {CityModel} from '@app/core/stores/city/city.model';
import {BaseResponse} from '@app/core/models/base-response';

//#region Requests

export class CityRequest {
    constructor(model: CityModel) {
        this.id = Number(model.id);
        this.name = model.name;
    }

    id: number;
    name: string;
}

//#endregion

//#region Responses

export class CityListResponse extends BaseResponse {
    data: CityResponseData[];
}

export class CityResponse extends BaseResponse {
    data: CityResponseData;
}

export class CityResponseData {
    id: number;
    name: string;
}

//#endregion
