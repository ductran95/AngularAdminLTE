export class IcheckOption {
    public constructor(init?:Partial<IcheckOption>) {
        Object.assign(this, init);
    }

    checkboxClass: string = '';
    radioClass: string = '';
}
