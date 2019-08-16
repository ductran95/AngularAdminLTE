import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableOption } from '@app/core/models/options/data-table-option';
import { PopupOption } from '@app/core/models/options/popup-option';
import { PopupComponent } from '@app/shared/components/popup/popup.component';
import { DataTableComponent } from '@app/shared/components/data-table/data-table.component';
import * as _ from 'lodash';
import { CityService } from '@app/core/services/data/city.service';
import { NgForm } from '@angular/forms';
import { AlertService } from '@app/core/services/common/alert.service';
import { CountyModel } from '@app/core/models/data/county-model';
import { CityModel } from '@app/core/models/data/city-model';

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

  model: CountyModel;

  dropDownList: {
    cityList: CityModel[]
  };

  searchParams: {
    cityId: number,
    name: string
  };

  //#endregion

  //#region Constructors

  constructor(private cityService: CityService, private alertService: AlertService) { }

  //#endregion

  //#region OnInit

  ngOnInit() {

    this.dropDownList = {
      cityList: [{
        id: 1,
        name: 'Ha Noi'
      }]
    };

    this.searchParams = {
      cityId: null,
      name: ''
    };

    this.model = new CountyModel();

    this.cityService.getAll().subscribe(
      resp => {
        this.dropDownList.cityList = resp;
      },
      error => this.alertService.error(error)
    );

    this.dataTableCountyOptions = {
      data: [{
        id: 1,
        name: 'CG',
        city: {
          id: 1,
          name: 'HN'
        }
      }],
      columns: [
        { title: 'Id', data: 'id' },
        { title: 'Name', data: 'name' },
        { title: 'City', data: 'city.name' },
      ],
      columnDefs: [],
      paging: true,
      lengthChange: false,
      searching: false,
      ordering: true,
      info: true,
      autoWidth: false,
      actions: ['Add', 'Edit', 'Delete']
    };

    this.popupAddEditCountyOptions = {
      type: '',
      title: 'Add County',
      okText: 'Add',
      cancelText: 'Cancel'
    };

    this.popupDeleteCountyOptions = {
      type: '',
      title: 'Delete County',
      okText: 'Yes',
      cancelText: 'Cancel'
    };

    this.resetForm();
  }

  //#endregion

  //#region Funtions

  showPopupAdd() {
    this.resetForm();
    this.popupAddEditCountyOptions.okText = 'Add';
    this.popupAddEditCountyOptions.title = 'Add County';
    this.popupAddEditCounty.show();
  }

  showPopupEdit(event) {
    const data = this.dataTableCounty.getRowData<CountyModel>(event.currentTarget);
    this.model = _.cloneDeep(data);
    this.popupAddEditCountyOptions.okText = 'Update';
    this.popupAddEditCountyOptions.title = 'Update County';
    this.popupAddEditCounty.show();
  }

  showPopupDelete(event) {
    const data = this.dataTableCounty.getRowData<CountyModel>(event.currentTarget);
    this.model = _.cloneDeep(data);
    this.popupDeleteCounty.show();
  }

  refreshDataTable() {
    this.dataTableCounty.refreshData();
  }

  resetForm() {
    this.model = new CountyModel();
  }

  onCountyFormSubmit(addCountyForm: NgForm) {
    if (addCountyForm.valid) {
      // Update
      if (this.model.id) {
        const data = _.find(this.dataTableCountyOptions.data, { id: this.model.id });
        _.assign(data, this.model);
        this.alertService.success('Update county success');
        this.resetForm();
        this.popupAddEditCounty.hide();
        this.refreshDataTable();
      } else {
        const maxItem = _.maxBy(this.dataTableCountyOptions.data, 'id');
        let id = 1;
        if (maxItem) {
          id = maxItem.id + 1;
        }
        this.model.id = id;
        this.dataTableCountyOptions.data.push(this.model);
        this.alertService.success('Add county success');
        this.resetForm();
        this.popupAddEditCounty.hide();
        this.refreshDataTable();
      }
    }
  }

  onDeleteCountySubmit(event) {
    if (this.model.id) {
      _.remove(this.dataTableCountyOptions.data, { id: this.model.id });
      this.alertService.success('Delete county success');
      this.resetForm();
      this.popupDeleteCounty.hide();
      this.refreshDataTable();
    }
  }

  onSearchFormSubmit(searchCountyForm: NgForm) {
    if (searchCountyForm.valid) {
      const city = _.find<CityModel>(this.dropDownList.cityList, { id: this.searchParams.cityId });
      const cityName = city ? city.name : '';
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
