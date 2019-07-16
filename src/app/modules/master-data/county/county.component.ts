import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableOption } from '@app/shared/models/options/data-table-option';
import { PopupOption } from '@app/shared/models/options/popup-option';
import { PopupComponent } from '@app/shared/components/popup/popup.component';
import { DataTableComponent } from '@app/shared/components/data-table/data-table.component';
import { County } from '@app/shared/models/master-data/county';
import * as _ from 'lodash';
import { CityService } from '@app/shared/services/master-data/city.service';
import { City } from '@app/shared/models/master-data/city';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'master-data-county',
  templateUrl: './county.component.html',
  styleUrls: ['./county.component.scss']
})
export class CountyComponent implements OnInit {

  //#region Inputs

  //#endregion

  //#region Properties

  dataTableCountyOptions: DataTableOption;

  popupAddEditCountyOptions: PopupOption;

  popupDeleteCountyOptions: PopupOption;

  @ViewChild('popupAddEditCounty', { static: false }) popupAddEditCounty: PopupComponent;

  @ViewChild('popupDeleteCounty', { static: false }) popupDeleteCounty: PopupComponent;

  @ViewChild('dataTableCounty', { static: false }) dataTableCounty: DataTableComponent;

  model: County;

  dropDownList: {
    cityList: City[]
  };

  searchParams: {
    cityId: number,
    name: string
  };

  //#endregion

  //#region Constructors

  constructor(private cityService: CityService) { }

  //#endregion

  //#region OnInit

  ngOnInit() {

    this.dropDownList = {
      cityList: []
    };

    this.searchParams = {
      cityId: null,
      name: ""
    };

    this.cityService.getAll().subscribe((resp: City[]) => {
      this.dropDownList.cityList = resp;
    })

    this.dataTableCountyOptions = new DataTableOption({
      data: [new County({
        id: 1,
        countyName: 'HN',
        cityId: 1
      })],
      columns: [
        { title: 'Id', data: 'id' },
        { title: 'Name', data: 'countyName' },
        {
          title: 'City', data: (data) => {
            let city = _.find<City>(this.dropDownList.cityList, { id: data.cityId });
            return city ? city.name : '';
          }
        },
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

    this.popupAddEditCountyOptions = {
      type: "",
      title: "Add County",
      okText: "Add",
      cancelText: "Cancel"
    };

    this.popupDeleteCountyOptions = {
      type: "",
      title: "Delete County",
      okText: "Yes",
      cancelText: "Cancel"
    };

    this.model = new County();
  }

  //#endregion

  //#region Funtions

  showPopupAdd() {
    this.resetForm();
    this.popupAddEditCountyOptions.okText = "Add";
    this.popupAddEditCountyOptions.title = "Add County";
    this.popupAddEditCounty.show();
  }

  showPopupEdit(event) {
    let data = this.dataTableCounty.getRowData(event.currentTarget);
    this.model = _.cloneDeep(data);
    this.popupAddEditCountyOptions.okText = "Update";
    this.popupAddEditCountyOptions.title = "Update County";
    this.popupAddEditCounty.show();
  }

  showPopupDelete(event) {
    let data = this.dataTableCounty.getRowData(event.currentTarget);
    this.model = _.cloneDeep(data);
    this.popupDeleteCounty.show();
  }

  refreshDataTable() {
    this.dataTableCounty.refreshData();
  }

  resetForm() {
    this.model = new County();
  }

  onCountyFormSubmit(addCountyForm: NgForm) {
    if (addCountyForm.valid) {
      // Update
      if (this.model.id) {
        let data = _.find(this.dataTableCountyOptions.data, { id: this.model.id });
        _.assign(data, this.model);
        this.resetForm();
        this.popupAddEditCounty.hide();
        this.refreshDataTable();
      }
      // Add
      else {
        let maxItem = _.maxBy(this.dataTableCountyOptions.data, 'id');
        let id = 1;
        if (maxItem) {
          id = maxItem.id + 1;
        }
        this.model.id = id;
        this.dataTableCountyOptions.data.push(this.model);
        this.resetForm();
        this.popupAddEditCounty.hide();
        this.refreshDataTable();
      }
    }
  }

  onDeleteCountySubmit(event) {
    if (this.model.id) {
      _.remove(this.dataTableCountyOptions.data, { id: this.model.id });
      this.resetForm();
      this.popupDeleteCounty.hide();
      this.refreshDataTable();
    }
  }

  onSearchFormSubmit(searchCountyForm: NgForm) {
    if (searchCountyForm.valid) {
      let city = _.find<City>(this.dropDownList.cityList, { id: this.searchParams.cityId });
      let cityName = city ? city.name : "";
      this.dataTableCounty.search([
        {
          columnIndex: 1,
          searchKey: this.searchParams.name
        },
        {
          columnIndex: 2,
          searchKey: cityName
        },
      ]);
    }
  }
  //#endregion

}
