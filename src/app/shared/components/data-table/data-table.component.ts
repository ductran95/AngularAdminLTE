import { Component, OnInit, ViewChild, Input, Renderer, Output, EventEmitter } from '@angular/core';
import { DataTableOption } from '@app/shared/models/options/data-table-option';
import { DataTableSearchParam } from '@app/shared/models/params/data-table-search-param';

import 'datatables.net';

@Component({
  selector: 'common-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  //#region Inputs, Outputs

  @Input() options: DataTableOption;
  @Input() title: string;

  @Output() onAddClick: EventEmitter<any> = new EventEmitter();
  @Output() onEditClick: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteClick: EventEmitter<any> = new EventEmitter();

  //#endregion

  //#region Properties

  @ViewChild('dataTable', { static: true }) tableElement;
  table: JQuery;

  private _hasAttachedListenerEdit: boolean = false;
  private _hasAttachedListenerDelete: boolean = false;

  protected _hasAdd: boolean = false;
  private _hasEdit: boolean = false;
  private _hasDelete: boolean = false;

  //#endregion

  //#region Constructors

  constructor(private renderer: Renderer) { }

  //#endregion

  //#region OnInit

  ngOnInit() {

    if (!this.options) {
      this.options = new DataTableOption({
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
      });
    }
    else {
      this._hasAdd = this.options.actions.includes("Add");
      this._hasEdit = this.options.actions.includes("Edit");
      this._hasDelete = this.options.actions.includes("Delete");

      if(this._hasEdit || this._hasDelete){
        this.options.columns.push({
          title: 'Actions',
          data: null,
          defaultContent: (this._hasEdit ? '<a id=editButton class="btn btn-app" ><i class="fa fa-edit"></i> Edit</a>' : '')
          + (this._hasDelete ? '<a class="btn btn-app" id=deleteButton><i class="fa fa-trash"></i> Delete</a>' : '')
        });
      }

      this.options.dom = 'lrtip';
      
      this.options.drawCallback = () => {
        this.rebindEvent();
      }
    }

    this.table = $(this.tableElement.nativeElement);

    this.table.DataTable(this.options);
  }

  ngAfterViewChecked() {
    if (!this._hasAttachedListenerEdit) {
      let buttons = this.tableElement.nativeElement.querySelectorAll("#editButton");
      if (buttons.length > 0) {
        for (let i = 0; i < buttons.length; i++) {
          this.renderer.listen(buttons[i], 'click', (evt) => {
            this.onEditClick.emit(evt);
          });
        }
        this._hasAttachedListenerEdit = true;
      }
    }

    if (!this._hasAttachedListenerDelete) {
      let buttons = this.tableElement.nativeElement.querySelectorAll("#deleteButton");
      if (buttons.length > 0) {
        for (let i = 0; i < buttons.length; i++) {
          this.renderer.listen(buttons[i], 'click', (evt) => {
            this.onDeleteClick.emit(evt);
          });
        }
        this._hasAttachedListenerEdit = true;
      }
    }
  }

  //#endregion

  //#region Funtions

  private rebindEvent() {
    if(this._hasEdit){
      this._hasAttachedListenerEdit = false;
    }
    if(this._hasDelete){
      this._hasAttachedListenerDelete = false;
    }
  }

  private onAdd(item: any) {
    this.onAddClick.emit(item);
  }

  refreshData() {
    // Server data
    if (this.options.ajax) {
      this.table.DataTable().ajax.reload();
    }
    // Local data
    else {
      this.table.DataTable().clear().draw();
      this.table.DataTable().rows.add(this.options.data); // Add new data
      this.table.DataTable().columns.adjust().draw(); // Redraw the DataTable
    }
  }

  getRowData(ele): any {
    let tr = $(ele).closest("tr");
    return this.table.DataTable().row(tr).data();
  }

  search(searchParams: DataTableSearchParam[]) {
    searchParams.forEach(element => {
      this.table.DataTable().columns(element.columnIndex).search(element.searchKey);
    });
    this.table.DataTable().draw();
  }

  //#endregion
}
