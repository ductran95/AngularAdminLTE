import { BaseResponse } from '@app/shared/datas/api-model/base-response';

export class CityResponse extends BaseResponse {
    data: CityResponseData[];
}

export class CityResponseData {
    id: number;
    name: string;
}
