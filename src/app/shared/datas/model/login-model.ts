export class LoginModel {
    constructor() {
        this.email = null;
        this.password = null;
        this.remember = null;
    }

    email: string;
    password: string;
    remember: boolean;
}
