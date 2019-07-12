export class DataTableOption {
    public constructor(init?:Partial<DataTableOption>) {
        Object.assign(this, init);
    }

    data: Array<any>;
    columns: Array<any>;
    columnDefs: Array<any>;
    paging: boolean;
    lengthChange: boolean;
    searching: boolean;
    ordering: boolean;
    info: boolean;
    autoWidth: boolean;
    ajax: any;
    drawCallback: any;
}
