import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableOption } from '@app/shared/models/options/data-table-option';
import { PopupOption } from '@app/shared/models/options/popup-option';
import { PopupComponent } from '@app/shared/components/popup/popup.component';
import { DataTableComponent } from '@app/shared/components/data-table/data-table.component';
import { City } from '@app/shared/models/master-data/city';
import * as _ from "lodash";
import { CityService } from '@app/shared/services/master-data/city.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'master-data-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  //#region Inputs

  //#endregion

  //#region Properties

  dataTableCityOptions: DataTableOption;

  popupAddEditCityOptions: PopupOption;

  popupDeleteCityOptions: PopupOption;

  @ViewChild('popupAddEditCity', { static: false }) popupAddEditCity: PopupComponent;

  @ViewChild('popupDeleteCity', { static: false }) popupDeleteCity: PopupComponent;

  @ViewChild('dataTableCity', { static: false }) dataTableCity: DataTableComponent;

  model: City;

  searchParams: {
    name: string
  };

  //#endregion

  //#region Constructors

  constructor(private cityService: CityService) { }

  //#endregion

  //#region OnInit

  ngOnInit() {

    this.searchParams = {
      name: ""
    };

    this.dataTableCityOptions = new DataTableOption({
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
      autoWidth: false,
      actions: ['Add', 'Edit', 'Delete']
    });

    this.popupAddEditCityOptions = {
      type: "",
      title: "Add City",
      okText: "Add",
      cancelText: "Cancel"
    };

    this.popupDeleteCityOptions = {
      type: "",
      title: "Delete City",
      okText: "Yes",
      cancelText: "Cancel"
    };

    this.resetForm();
  }

  //#endregion

  //#region Funtions

  showPopupAdd() {
    this.resetForm();
    this.popupAddEditCityOptions.okText = "Add";
    this.popupAddEditCityOptions.title = "Add City";
    this.popupAddEditCity.show();
  }

  showPopupEdit(event) {
    let data = this.dataTableCity.getRowData(event.currentTarget);
    this.cityService.getById(data.Id).subscribe((resp: City[]) => {
      this.model = resp[0];
    })
    this.popupAddEditCityOptions.okText = "Update";
    this.popupAddEditCityOptions.title = "Update City";
    this.popupAddEditCity.show();
  }

  showPopupDelete(event) {
    let data = this.dataTableCity.getRowData(event.currentTarget);
    this.model = _.cloneDeep(data);
    this.popupDeleteCity.show();
  }

  refreshDataTable() {
    this.dataTableCity.refreshData();
  }

  resetForm() {
    this.model = {
      id: null,
      name: ''
    }
  }

  onCityFormSubmit(addCityForm: NgForm) {
    if (addCityForm.valid) {
      // Update
      if (this.model.id) {
        this.cityService.update(this.model).subscribe((resp: any) => {
          this.resetForm();
          this.popupAddEditCity.hide();
          this.refreshDataTable();
        });
      }
      // Add
      else {
        this.cityService.add(this.model).subscribe((resp: any) => {
          this.resetForm();
          this.popupAddEditCity.hide();
          this.refreshDataTable();
        });
      }
    }
  }

  onDeleteCitySubmit(event) {
    if (this.model.id) {
      this.cityService.delete(this.model.id).subscribe((resp: any) => {
        this.resetForm();
        this.popupDeleteCity.hide();
        this.refreshDataTable();
      });
    }
  }

  onSearchFormSubmit(searchCityForm: NgForm) {
    if (searchCityForm.valid) {
      this.dataTableCity.search([
        {
          columnIndex: 1,
          searchKey: this.searchParams.name
        }
      ]);
    }
  }

  //#endregion

}
