export class DataTableSearchParam {
    public constructor(init?:Partial<DataTableSearchParam>) {
        Object.assign(this, init);
    }

    columnIndex: number = null;
    searchKey: string = '';
}
