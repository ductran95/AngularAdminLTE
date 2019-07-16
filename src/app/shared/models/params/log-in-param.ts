export class LogInParam {
    public constructor(init?:Partial<LogInParam>) {
        Object.assign(this, init);
    }

    email: string = '';
    password: string = '';
    remember: boolean = false;
}
