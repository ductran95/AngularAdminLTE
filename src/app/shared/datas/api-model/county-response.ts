import { BaseResponse } from '@app/shared/datas/api-model/base-response';

export class CountyResponse extends BaseResponse {
    data: CountyResponseData[]
}

export class CountyResponseData {
    id: number;
    countyName: string;
    cityId: number;
}
