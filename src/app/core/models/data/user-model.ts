import { UserResponseData } from '@app/core/models/api-data/user-response';

export class UserModel {
    constructor();
    constructor(response: UserResponseData);
    constructor(response?: UserResponseData) {
        this.id = response ? response.id : null;
        this.userName = response ? response.userName : null;
        this.fullName = response ? response.fullName : null;
        this.email = response ? response.email : null;
        this.address = response ? response.address : null;
        this.phoneNumber = response ? response.phoneNumber : null;
        this.password = null;
    }

    id: number;
    userName: string;
    fullName: string;
    password: string;
    email: string;
    address: string;
    phoneNumber: string;
}
