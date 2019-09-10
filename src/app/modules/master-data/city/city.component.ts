import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableOption } from '@app/core/models/data-table-option';
import { PopupOption } from '@app/core/models/popup-option';
import { PopupComponent } from '@app/shared/components/popup/popup.component';
import { DataTableComponent } from '@app/shared/components/data-table/data-table.component';
import * as _ from 'lodash';
import { CityApiService } from '@app/core/stores/city/city.api-service';
import { NgForm } from '@angular/forms';
import { CityModel } from '@app/core/models/data/city-model';
import { AlertService } from '@app/core/services/alert.service';


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

    model: CityModel;

    searchParams: {
        name: string
    };

    //#endregion

    //#region Constructors

    constructor(private cityService: CityApiService, private alertService: AlertService) { }

    //#endregion

    //#region OnInit

    ngOnInit() {

        this.searchParams = {
            name: ''
        };

        this.model = new CityModel();

        this.dataTableCityOptions = {
            data: [],
            ajax: (dataTablesParameters: any, callback) => {
                this.cityService.getAll().subscribe(
                    resp => {
                        callback({
                            recordsTotal: resp.length,
                            recordsFiltered: resp.length,
                            data: resp
                        });
                    },
                    error => this.alertService.error(error)
                );
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
        };

        this.popupAddEditCityOptions = {
            type: '',
            title: 'Add City',
            okText: 'Add',
            cancelText: 'Cancel'
        };

        this.popupDeleteCityOptions = {
            type: '',
            title: 'Delete City',
            okText: 'Yes',
            cancelText: 'Cancel'
        };

    }

    //#endregion

    //#region Funtions

    showPopupAdd() {
        this.resetForm();
        this.popupAddEditCityOptions.okText = 'Add';
        this.popupAddEditCityOptions.title = 'Add City';
        this.popupAddEditCity.show();
    }

    showPopupEdit(event) {
        const data = this.dataTableCity.getRowData<CityModel>(event.currentTarget);
        this.cityService.getById(data.id).subscribe(
            resp => {
                this.model = resp;
                this.popupAddEditCityOptions.okText = 'Update';
                this.popupAddEditCityOptions.title = 'Update City';
                this.popupAddEditCity.show();
            },
            error => this.alertService.error(error)
        );
    }

    showPopupDelete(event) {
        const data = this.dataTableCity.getRowData<CityModel>(event.currentTarget);
        this.model = _.cloneDeep(data);
        this.popupDeleteCity.show();
    }

    refreshDataTable() {
        this.dataTableCity.refreshData();
    }

    resetForm() {
        this.model = new CityModel();
    }

    onCityFormSubmit(addCityForm: NgForm) {
        if (addCityForm.valid) {
            // Update
            if (this.model.id) {
                this.cityService.update(this.model).subscribe(
                    resp => {
                        this.resetForm();
                        this.popupAddEditCity.hide();
                        this.refreshDataTable();
                    },
                    error => this.alertService.error(error)
                );
            } else {
                this.cityService.add(this.model).subscribe(
                    resp => {
                        this.resetForm();
                        this.popupAddEditCity.hide();
                        this.refreshDataTable();
                    },
                    error => this.alertService.error(error)
                );
            }
        }
    }

    onDeleteCitySubmit(event) {
        if (this.model.id) {
            this.cityService.delete(this.model.id).subscribe(
                resp => {
                    this.resetForm();
                    this.popupDeleteCity.hide();
                    this.refreshDataTable();
                },
                error => this.alertService.error(error)
            );
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
