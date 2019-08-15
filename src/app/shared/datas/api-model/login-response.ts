import { BaseResponse } from '@app/shared/datas/api-model/base-response';
import { UserResponseData } from '@app/shared/datas/api-model/user-response';

export class LoginResponse extends BaseResponse {
    data: {
        token: string;
        user: UserResponseData;
    };
}
