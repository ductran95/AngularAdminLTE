import { BaseResponse } from '@app/core/models/api-data/base-response';
import { UserResponseData } from '@app/core/models/api-data/user-response';

export class LoginResponse extends BaseResponse {
    data: {
        token: string;
        user: UserResponseData;
    };
}
