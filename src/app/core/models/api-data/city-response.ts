import { BaseResponse } from '@app/core/models/api-data/base-response';

export class CityResponse extends BaseResponse {
    data: CityResponseData[];
}

export class CityResponseData {
    id: number;
    name: string;
}
