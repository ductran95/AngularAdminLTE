import { BaseResponse } from '@app/shared/datas/api-model/base-response';

export class UserResponse extends BaseResponse {
    data: UserResponseData[];
}

export class UserResponseData {
    id: number;
    userName: string;
    fullName: string;
    email: string;
    address: string;
    phoneNumber: string;
}
