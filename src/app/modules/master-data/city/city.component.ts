import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableOption} from '@app/core/models/data-table-option';
import {PopupOption} from '@app/core/models/popup-option';
import {PopupComponent} from '@app/shared/components/popup/popup.component';
import {DataTableComponent} from '@app/shared/components/data-table/data-table.component';
import {NgForm} from '@angular/forms';
import {AlertService} from '@app/core/services/alert.service';
import {CityService} from '@app/core/stores/city/city.service';
import {CityModel, createCity} from '@app/core/stores/city/city.model';
import {CityQuery} from '@app/core/stores/city/city.query';
import {Observable, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';


@Component({
    selector: 'master-data-city',
    templateUrl: './city.component.html',
    styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit, OnDestroy {

    //#region Inputs

    //#endregion

    //#region Properties

    private subscription: Subscription = new Subscription();

    dataTableCityOptions: DataTableOption;

    popupAddEditCityOptions: PopupOption;

    popupDeleteCityOptions: PopupOption;

    @ViewChild('popupAddEditCity', {static: false}) popupAddEditCity: PopupComponent;

    @ViewChild('popupDeleteCity', {static: false}) popupDeleteCity: PopupComponent;

    @ViewChild('dataTableCity', {static: false}) dataTableCity: DataTableComponent;

    model: CityModel;

    cityData$: Observable<CityModel[]>;

    searchParams: {
        name: string
    };

    //#endregion

    //#region Constructors

    constructor(private cityQuery: CityQuery, private cityService: CityService, private alertService: AlertService) {
    }

    //#endregion

    //#region Life Cycle

    ngOnInit() {

        this.searchParams = {
            name: ''
        };

        this.model = createCity(null);

        this.cityData$ = this.cityQuery.selectAll();

        this.dataTableCityOptions = {
            data: [],
            ajax: (dataTablesParameters: any, callback) => {
                const sub = this.cityData$.subscribe(
                    resp => {
                        callback({
                            recordsTotal: resp.length,
                            recordsFiltered: resp.length,
                            data: resp
                        });
                    },
                    error => this.alertService.error(error)
                );
                this.subscription.add(sub);
            },
            columns: [
                {title: 'Id', data: 'id'},
                {title: 'Name', data: 'name'},
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

        this.refreshDataTable();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    //#endregion

    //#region Functions

    showPopupAdd() {
        this.resetForm();
        this.popupAddEditCityOptions.okText = 'Add';
        this.popupAddEditCityOptions.title = 'Add City';
        this.popupAddEditCity.show();
    }

    showPopupEdit(event) {
        const data = this.dataTableCity.getRowData<CityModel>(event.currentTarget);
        this.cityQuery.select(data.id).pipe(take(1)).subscribe(
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
        this.model = data;
        this.popupDeleteCity.show();
    }

    refreshDataTable() {
        this.cityService.get().subscribe(
            response => {
                this.alertService.success(response);
            },
            error => {
                this.alertService.error(error);
            }
        );
        this.dataTableCity.refreshData();
    }

    resetForm(addCityForm?: NgForm) {
        this.model = createCity(null);
        if (addCityForm) {
            addCityForm.resetForm();
        }
    }

    onCityFormSubmit(addCityForm: NgForm) {
        if (addCityForm.valid) {
            // Update
            if (this.model.id) {
                this.cityService.update(this.model.id, this.model).subscribe(
                    resp => {
                        this.resetForm(addCityForm);
                        this.popupAddEditCity.hide();
                        this.refreshDataTable();
                    },
                    error => this.alertService.error(error)
                );
            } else {
                this.cityService.add(this.model).subscribe(
                    resp => {
                        this.resetForm(addCityForm);
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
            this.cityService.remove(this.model.id).subscribe(
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
