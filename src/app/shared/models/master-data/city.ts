export class City {
    public constructor(init?:Partial<City>) {
        Object.assign(this, init);
    }

    id: number = null;
    name: string = "";
}
