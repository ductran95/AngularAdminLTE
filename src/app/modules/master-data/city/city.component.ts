import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableOption } from '@app/shared/models/options/data-table-option';
import { PopupOption } from '@app/shared/models/options/popup-option';
import { PopupComponent } from '@app/shared/components/popup/popup.component';
import { DataTableComponent } from '@app/shared/components/data-table/data-table.component';
import { City } from '@app/shared/models/master-data/city';
import * as _ from "lodash";
import { CityService } from '@app/shared/services/master-data/city.service';


@Component({
  selector: 'master-data-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  //#region Inputs

  //#endregion

  //#region Properties

  dataTableOptions: DataTableOption;

  popupAddEditOptions: PopupOption;

  popupDeleteOptions: PopupOption;

  @ViewChild('popupAddEditCity', { static: false }) popupAddEditCity: PopupComponent;

  @ViewChild('popupDeleteCity', { static: false }) popupDeleteCity: PopupComponent;

  @ViewChild('dataTableCity', { static: false }) dataTableCity: DataTableComponent;

  model: City;

  //#endregion

  //#region Constructors

  constructor(private cityService: CityService) { }

  //#endregion

  //#region OnInit

  ngOnInit() {
    this.dataTableOptions = new DataTableOption({
      data: [],
      ajax: (dataTablesParameters: any, callback) => {    
        this.cityService.getAll().subscribe((resp: City[]) => {
          callback({
            recordsTotal: resp.length,
            recordsFiltered: resp.length,
            data: resp
          });
        })   
      }, 
      columns: [
        { title: 'Id', data: 'id' },
        { title: 'Name', data: 'name' },
      ],
      columnDefs: [],
      paging: true,
      lengthChange: false,
      searching: false,
      ordering: true,
      info: true,
      autoWidth: false
    });

    this.popupAddEditOptions = {
      type: "",
      title: "Add City",
      okText: "Add",
      cancelText: "Cancel"
    };

    this.popupDeleteOptions = {
      type: "",
      title: "Delete City",
      okText: "Yes",
      cancelText: "Cancel"
    };

    this.model = new City();
  }

  //#endregion

  //#region Funtions

  showPopupAdd() {
    this.resetForm();
    this.popupAddEditOptions.okText = "Add";
    this.popupAddEditOptions.title = "Add City";
    this.popupAddEditCity.show();
  }

  showPopupEdit(event) {
    var data = this.dataTableCity.getRowData(event.currentTarget);
    this.model = _.cloneDeep(data);
    this.popupAddEditOptions.okText = "Update";
    this.popupAddEditOptions.title = "Update City";
    this.popupAddEditCity.show();
  }

  showPopupDelete(event) {
    var data = this.dataTableCity.getRowData(event.currentTarget);
    this.model = _.cloneDeep(data);
    this.popupDeleteCity.show();
  }

  refreshDataTable() {
    this.dataTableCity.refreshData();
  }

  resetForm() {
    this.model = new City();
  }

  onCityFormSubmit(event) {
    // Update
    if (this.model.id) {
      var data = _.find(this.dataTableOptions.data, {id: this.model.id});
      _.assign(data, this.model);
      this.resetForm();
      this.popupAddEditCity.hide();
      this.refreshDataTable();
    }
    // Add
    else {
      var maxItem = _.maxBy(this.dataTableOptions.data, 'id');
      var id = 1;
      if (maxItem) {
        id = maxItem.id + 1;
      }
      this.model.id = id;
      this.dataTableOptions.data.push(this.model);
      this.resetForm();
      this.popupAddEditCity.hide();
      this.refreshDataTable();
    }
  }

  onDeleteCitySubmit(event) {
    if (this.model.id) {
      _.remove(this.dataTableOptions.data, {id: this.model.id});
      this.resetForm();
      this.popupDeleteCity.hide();
      this.refreshDataTable();
    }
  }

  //#endregion

}
