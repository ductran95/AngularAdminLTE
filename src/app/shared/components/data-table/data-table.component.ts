import { Component, OnInit, ViewChild, Input, Output, EventEmitter, Renderer2, AfterViewChecked } from '@angular/core';
import { DataTableOption } from '@app/core/models/options/data-table-option';

import 'datatables.net';
import { DataTableSearchModel } from '@app/core/models/data/data-table-search-model';
import * as _ from 'lodash';

@Component({
    selector: 'common-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewChecked {

    //#region Inputs, Outputs

    @Input() options: DataTableOption;
    @Input() title: string;

    @Output() addClick: EventEmitter<any> = new EventEmitter();
    @Output() editClick: EventEmitter<any> = new EventEmitter();
    @Output() deleteClick: EventEmitter<any> = new EventEmitter();
    @Output() viewClick: EventEmitter<any> = new EventEmitter();

    //#endregion

    //#region Properties

    @ViewChild('dataTable', { static: true }) tableElement;
    table: JQuery;

    private _hasAttachedListenerEdit = false;
    private _hasAttachedListenerDelete = false;
    private _hasAttachedListenerView = false;

    protected _hasAdd = false;
    private _hasEdit = false;
    private _hasDelete = false;
    private _hasView = false;

    //#endregion

    //#region Constructors

    constructor(private renderer: Renderer2) { }

    //#endregion

    //#region OnInit

    ngOnInit() {

        if (!this.options) {
            this.options = {
                data: [],
                columns: [],
                columnDefs: [],
                paging: true,
                lengthChange: false,
                searching: false,
                ordering: true,
                info: true,
                autoWidth: false,
                drawCallback: () => {
                    this._hasAttachedListenerEdit = false;
                    this._hasAttachedListenerDelete = false;
                },
                dom: 'lrtip'
            };
        } else {
            this._hasAdd = this.options.actions.includes('Add');
            this._hasEdit = this.options.actions.includes('Edit');
            this._hasDelete = this.options.actions.includes('Delete');

            if (this._hasEdit || this._hasDelete) {
                this.options.columns.push({
                    title: 'Actions',
                    data: null,
                    defaultContent: (this._hasEdit ? '<a id=editButton class="btn btn-app" ><i class="fa fa-edit"></i> Edit</a>' : '')
                        + (this._hasDelete ? '<a class="btn btn-app" id=deleteButton><i class="fa fa-trash"></i> Delete</a>' : '')
                });
            }

            if (this._hasView) {
                this.options.createdRow = (row, data) => {
                    $(row).find('td').addClass('table-row');
                    if (_.find(this.options.columns, { title: 'Actions' })) {
                        $(row).find('td:last-child').removeClass('table-row');
                    }
                };
            }

            this.options.dom = 'lrtip';

            this.options.drawCallback = () => {
                this.rebindEvent();
            };
        }

        this.table = $(this.tableElement.nativeElement);

        this.table.DataTable(this.options);
    }

    ngAfterViewChecked() {
        if (!this._hasAttachedListenerEdit) {
            const buttons = this.tableElement.nativeElement.querySelectorAll('#editButton');
            if (buttons.length > 0) {
                // tslint:disable-next-line: prefer-for-of
                for (let i = 0; i < buttons.length; i++) {
                    this.renderer.listen(buttons[i], 'click', (evt) => {
                        this.editClick.emit(evt);
                    });
                }
                this._hasAttachedListenerEdit = true;
            }
        }

        if (!this._hasAttachedListenerDelete) {
            const buttons = this.tableElement.nativeElement.querySelectorAll('#deleteButton');
            if (buttons.length > 0) {
                // tslint:disable-next-line: prefer-for-of
                for (let i = 0; i < buttons.length; i++) {
                    this.renderer.listen(buttons[i], 'click', (evt) => {
                        this.deleteClick.emit(evt);
                    });
                }
                this._hasAttachedListenerEdit = true;
            }
        }

        if (!this._hasAttachedListenerView) {
            const rows = this.tableElement.nativeElement.querySelectorAll('.table-row');
            if (rows.length > 0) {
                // tslint:disable-next-line: prefer-for-of
                for (let i = 0; i < rows.length; i++) {
                    this.renderer.listen(rows[i], 'click', (evt) => {
                        this.viewClick.emit(evt);
                    });
                }
                this._hasAttachedListenerView = true;
            }
        }
    }

    //#endregion

    //#region Funtions

    private rebindEvent() {
        if (this._hasEdit) {
            this._hasAttachedListenerEdit = false;
        }
        if (this._hasDelete) {
            this._hasAttachedListenerDelete = false;
        }
        if (this._hasView) {
            this._hasAttachedListenerView = false;
        }
    }

    private onAdd(item: any) {
        this.addClick.emit(item);
    }

    refreshData() {
        // Server data
        if (this.options.ajax) {
            this.table.DataTable().ajax.reload();
        } else {
            this.table.DataTable().clear().draw();
            this.table.DataTable().rows.add(this.options.data); // Add new data
            this.table.DataTable().columns.adjust().draw(); // Redraw the DataTable
        }
    }

    getRowData<T>(ele): T {
        const tr = $(ele).closest('tr');
        let data = null;
        data = _.assign({}, this.table.DataTable().row(tr).data());
        return data as T;
    }

    search(searchParams: DataTableSearchModel[]) {
        searchParams.forEach(element => {
            this.table.DataTable().columns(element.columnIndex).search(element.searchKey);
        });
        this.table.DataTable().draw();
    }

    //#endregion
}
