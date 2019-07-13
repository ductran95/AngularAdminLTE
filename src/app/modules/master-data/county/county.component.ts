import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableOption } from '@app/shared/models/options/data-table-option';
import { PopupOption } from '@app/shared/models/options/popup-option';
import { PopupComponent } from '@app/shared/components/popup/popup.component';
import { DataTableComponent } from '@app/shared/components/data-table/data-table.component';
import { County } from '@app/shared/models/master-data/county';
import * as _ from 'lodash';
import { CityService } from '@app/shared/services/master-data/city.service';
import { City } from '@app/shared/models/master-data/city';

@Component({
  selector: 'master-data-county',
  templateUrl: './county.component.html',
  styleUrls: ['./county.component.css']
})
export class CountyComponent implements OnInit {

  //#region Inputs

  //#endregion

  //#region Properties

  dataTableOptions: DataTableOption;

  popupAddEditOptions: PopupOption;

  popupDeleteOptions: PopupOption;

  @ViewChild('popupAddEditCounty', { static: false }) popupAddEditCounty: PopupComponent;

  @ViewChild('popupDeleteCounty', { static: false }) popupDeleteCounty: PopupComponent;

  @ViewChild('dataTableCounty', { static: false }) dataTableCounty: DataTableComponent;

  model: County;

  dropDownList: any;

  //#endregion

  //#region Constructors

  constructor(private cityService: CityService) { }

  //#endregion

  //#region OnInit

  ngOnInit() {

    this.dropDownList = {
      cityList: []
    };

    // this.cityService.getAll().subscribe((resp: City[]) => {
    //   this.dropDownList.cityList = resp;
    // })

    this.dataTableOptions = new DataTableOption({
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
            var city = _.find(this.dropDownList.cityList, { Id: data.cityId });
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

    this.popupAddEditOptions = {
      type: "",
      title: "Add County",
      okText: "Add",
      cancelText: "Cancel"
    };

    this.popupDeleteOptions = {
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
    this.popupAddEditOptions.okText = "Add";
    this.popupAddEditOptions.title = "Add County";
    this.popupAddEditCounty.show();
  }

  showPopupEdit(event) {
    var data = this.dataTableCounty.getRowData(event.currentTarget);
    this.model = _.cloneDeep(data);
    this.popupAddEditOptions.okText = "Update";
    this.popupAddEditOptions.title = "Update County";
    this.popupAddEditCounty.show();
  }

  showPopupDelete(event) {
    var data = this.dataTableCounty.getRowData(event.currentTarget);
    this.model = _.cloneDeep(data);
    this.popupDeleteCounty.show();
  }

  refreshDataTable() {
    this.dataTableCounty.refreshData();
  }

  resetForm() {
    this.model = new County();
  }

  onCountyFormSubmit(event) {
    // Update
    if (this.model.id) {
      var data = _.find(this.dataTableOptions.data, {id: this.model.id});
      _.assign(data, this.model);
      this.resetForm();
      this.popupAddEditCounty.hide();
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
      this.popupAddEditCounty.hide();
      this.refreshDataTable();
    }
  }

  onDeleteCountySubmit(event) {
    if (this.model.id) {
      _.remove(this.dataTableOptions.data, {id: this.model.id});
      this.resetForm();
      this.popupDeleteCounty.hide();
      this.refreshDataTable();
    }
  }

  //#endregion

}
