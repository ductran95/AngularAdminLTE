export class DataTableOption implements DataTables.Settings {
    data?: any[];
    columns?: any[];
    columnDefs?: any[];
    paging?: boolean;
    lengthChange?: boolean;
    searching?: boolean;
    ordering?: boolean;
    info?: boolean;
    autoWidth?: boolean;
    ajax?: any;
    drawCallback?: any;
    actions?: string[];
    dom?: string;
}
