export class County {
    public constructor(init?:Partial<County>) {
        Object.assign(this, init);
    }

    id: number = null;
    countyName: string = "";
    cityId: number = null;
}
