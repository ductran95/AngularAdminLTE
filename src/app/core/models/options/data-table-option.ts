export class DataTableOption implements DataTables.Settings {
    data?: any[];
    columns?: DataTables.ColumnSettings[];
    columnDefs?: DataTables.ColumnDefsSettings[];
    paging?: boolean;
    lengthChange?: boolean;
    searching?: boolean;
    ordering?: boolean;
    info?: boolean;
    autoWidth?: boolean;
    ajax?: any;
    drawCallback?: any;
    actions?: ('Add' | 'Edit' | 'Delete' | 'View')[];
    dom?: string;
    createdRow?: any;
}
