import { LoginModel } from '@app/core/stores/auth/login.model';
import {BaseResponse} from '@app/core/models/base-response';
import {UserResponseData} from '@app/core/stores/user/user.api-model';

//#region Requests

export class LoginRequest {
    constructor(model: LoginModel) {
        this.email = model.email;
        this.password = model.password;
    }

    email: string;
    password: string;
}

//#endregion

//#region Responses

export class LoginResponse extends BaseResponse {
    data: {
        token: string;
        user: UserResponseData;
    };
}

//#endregion
