import { UserModel } from '@app/shared/datas/model/user-model';

export class UserRequest {
    constructor(model: UserModel) {
        this.id = model.id;
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
