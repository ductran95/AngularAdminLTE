export class IcheckOption implements ICheckOptions {
    public constructor(init?:Partial<IcheckOption>) {
        Object.assign(this, init);
    }

    checkboxClass: string = '';
    radioClass: string = '';
}
