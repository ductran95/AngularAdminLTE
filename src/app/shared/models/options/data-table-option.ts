export class DataTableOption implements DataTables.Settings {
    public constructor(init?:Partial<DataTableOption>) {
        Object.assign(this, init);
    }

    data: any[];
    columns: any[];
    columnDefs: any[];
    paging: boolean;
    lengthChange: boolean;
    searching: boolean;
    ordering: boolean;
    info: boolean;
    autoWidth: boolean;
    ajax: any;
    drawCallback: any;
    actions: string[];
    dom: string;
}
