import { BaseResponse } from '@app/core/models/api-data/base-response';

export class CountyResponse extends BaseResponse {
    data: CountyResponseData[];
}

export class CountyResponseData {
    id: number;
    countyName: string;
    cityId: number;
}
