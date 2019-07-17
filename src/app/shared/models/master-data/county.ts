export class County {
    public constructor(init?:Partial<County>) {
        Object.assign(this, init);
    }

    id: number;
    countyName: string;
    cityId: number;
}
