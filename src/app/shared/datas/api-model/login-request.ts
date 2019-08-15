import { LoginModel } from '@app/shared/datas/model/login-model';

export class LoginRequest {
    constructor(model: LoginModel) {
        this.email = model.email;
        this.password = model.password;
    }
    email: string;
    password: string;
}
