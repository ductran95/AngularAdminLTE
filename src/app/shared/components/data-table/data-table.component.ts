import { Component, OnInit, ViewChild, Input, Renderer, Output, EventEmitter } from '@angular/core';
import { DataTableOption } from '@app/shared/models/options/data-table-option';

declare var $;

@Component({
  selector: 'common-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
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
  table: any;

  private _hasAttachedListenerEdit: boolean = false;
  private _hasAttachedListenerDelete: boolean = false;

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
        autoWidth: false
      });
    }
    else {
      this.options.columns.push({
        title: 'Actions',
        data: null,
        defaultContent: '<a id=editButton class="btn btn-app" ><i class="fa fa-edit"></i> Edit</a> <a class="btn btn-app" id=deleteButton><i class="fa fa-trash"></i> Delete</a>'
      });
    }

    this.table = $(this.tableElement.nativeElement);

    this.table.DataTable(this.options);
  }

  ngAfterViewChecked() {
    if (!this._hasAttachedListenerEdit) {
      var buttons = this.tableElement.nativeElement.querySelectorAll("#editButton");
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
      var buttons = this.tableElement.nativeElement.querySelectorAll("#deleteButton");
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

  private onAdd(item: any) {
    this.onAddClick.emit(item);
  }

  refreshData() {
    // Server data
    if (this.options.ajax) {
      this.table.DataTable().ajax.reload(()=>{
        this._hasAttachedListenerEdit = false;
        this._hasAttachedListenerDelete = false;
      });
    }
    // Local data
    else {
      this.table.DataTable().clear().draw();
      this.table.DataTable().rows.add(this.options.data); // Add new data
      this.table.DataTable().columns.adjust().draw(); // Redraw the DataTable
      this._hasAttachedListenerEdit = false;
      this._hasAttachedListenerDelete = false;
    }
  }

  getRowData(ele): any {
    var tr = $(ele).closest("tr");
    return this.table.DataTable().row(tr).data();
  }

  //#endregion
}
