export class DataTableOption implements DataTables.Settings {
    public constructor(init?:Partial<DataTableOption>) {
        Object.assign(this, init);
    }

    data: any[] = [];
    columns: any[] = [];
    columnDefs: any[] = [];
    paging: boolean = false;
    lengthChange: boolean = false;
    searching: boolean = false;
    ordering: boolean = false;
    info: boolean = false;
    autoWidth: boolean = false;
    ajax: any;
    drawCallback: any;
    actions: string[] = [];
    dom: string = '';
}
