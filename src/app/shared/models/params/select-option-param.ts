export class SelectOptionParam {
    public constructor(init?:Partial<SelectOptionParam>) {
        Object.assign(this, init);
    }

    id: number = null;
    name: string = '';
}
