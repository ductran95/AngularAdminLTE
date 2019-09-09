import {BaseResponse} from '@app/core/models/api-data/base-response';
import {User} from '@app/core/stores/user/user.model';

//#region Requests

export class UserRequest {
    constructor(model: User) {
        this.id = model.id as number;
        this.userName = model.userName;
        this.address = model.address;
        this.email = model.email;
        this.fullName = model.fullName;
        this.phoneNumber = model.phoneNumber;
        this.password = model.password;
    }

    id: number;
    userName: string;
    fullName: string;
    password: string;
    email: string;
    address: string;
    phoneNumber: string;
}

//#endregion


//#region Responses

export class UserListResponse extends BaseResponse {
    data: UserResponseData[];
}

export class UserResponse extends BaseResponse {
    data: UserResponseData;
}

export class UserResponseData {
    id: number;
    userName: string;
    fullName: string;
    email: string;
    address: string;
    phoneNumber: string;
}

//#endregion
