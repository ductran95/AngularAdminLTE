import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableOption} from '@app/core/models/data-table-option';
import {PopupOption} from '@app/core/models/popup-option';
import {PopupComponent} from '@app/shared/components/popup/popup.component';
import {DataTableComponent} from '@app/shared/components/data-table/data-table.component';
import {NgForm} from '@angular/forms';
import {AlertService} from '@app/core/services/alert.service';
import {CountyModel, createCounty} from '@app/core/stores/county/county.model';
import {CityModel} from '@app/core/stores/city/city.model';
import {Observable, Subscription} from 'rxjs';
import {CityQuery} from '@app/core/stores/city/city.query';
import {CountyService} from '@app/core/stores/county/county.service';
import {CountyQuery} from '@app/core/stores/county/county.query';
import {map, take} from 'rxjs/operators';

@Component({
    selector: 'master-data-county',
    templateUrl: './county.component.html',
    styleUrls: ['./county.component.scss']
})
export class CountyComponent implements OnInit, OnDestroy {

    //#region Inputs

    //#endregion

    //#region Properties

    private subscription: Subscription = new Subscription();

    dataTableCountyOptions: DataTableOption;

    popupAddEditCountyOptions: PopupOption;

    popupDeleteCountyOptions: PopupOption;

    @ViewChild('popupAddEditCounty', {static: false}) popupAddEditCounty: PopupComponent;

    @ViewChild('popupDeleteCounty', {static: false}) popupDeleteCounty: PopupComponent;

    @ViewChild('dataTableCounty', {static: false}) dataTableCounty: DataTableComponent;

    model: CountyModel;

    countyData$: Observable<CountyModel[]>;

    dropDownList: {
        cityList$: Observable<CityModel[]>
    };

    searchParams: {
        cityId: number,
        name: string
    };

    //#endregion

    //#region Constructors

    constructor(private cityQuery: CityQuery, private countyService: CountyService,
                private countyQuery: CountyQuery, private alertService: AlertService) {
    }

    //#endregion

    //#region OnInit

    ngOnInit() {

        this.dropDownList = {
            cityList$: this.cityQuery.selectAll()
        };

        this.searchParams = {
            cityId: null,
            name: ''
        };

        this.model = createCounty(null);
        this.countyData$ = this.countyQuery.selectAll();

        this.dataTableCountyOptions = {
            data: [],
            ajax: (dataTablesParameters: any, callback) => {
                const sub = this.countyData$.subscribe(
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
                {title: 'City', data: 'city.name'},
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

        this.refreshDataTable();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    //#endregion

    //#region Functions

    showPopupAdd(addCountyForm?: NgForm) {
        this.resetForm(addCountyForm);
        this.popupAddEditCountyOptions.okText = 'Add';
        this.popupAddEditCountyOptions.title = 'Add County';
        this.popupAddEditCounty.show();
    }

    showPopupEdit(event, addCountyForm?: NgForm) {
        this.resetForm(addCountyForm);
        const data = this.dataTableCounty.getRowData<CountyModel>(event.currentTarget);
        this.countyQuery.select(data.id).pipe(take(1)).subscribe(
            resp => {
                this.model = data;
                this.popupAddEditCountyOptions.okText = 'Update';
                this.popupAddEditCountyOptions.title = 'Update County';
                this.popupAddEditCounty.show();
            },
            error => this.alertService.error(error)
        );
    }

    showPopupDelete(event) {
        const data = this.dataTableCounty.getRowData<CountyModel>(event.currentTarget);
        this.model = data;
        this.popupDeleteCounty.show();
    }

    refreshDataTable() {
        this.countyService.get().subscribe(
            response => {
                this.alertService.success(response);
            },
            error => {
                this.alertService.error(error);
            }
        );
        this.dataTableCounty.refreshData();
    }

    resetForm(addCountyForm?: NgForm) {
        this.model = createCounty(null);
        if (addCountyForm) {
            addCountyForm.resetForm();
        }
    }

    onCountyFormSubmit(addCountyForm: NgForm) {
        if (addCountyForm.valid) {
            // Update
            if (this.model.id) {
                this.countyService.update(this.model.id, this.model).subscribe(
                    resp => {
                        this.resetForm(addCountyForm);
                        this.popupAddEditCounty.hide();
                        this.refreshDataTable();
                    },
                    error => this.alertService.error(error)
                );
            } else {
                this.countyService.add(this.model).subscribe(
                    resp => {
                        this.resetForm(addCountyForm);
                        this.popupAddEditCounty.hide();
                        this.refreshDataTable();
                    },
                    error => this.alertService.error(error)
                );
            }
        }
    }

    onDeleteCountySubmit(event) {
        if (this.model.id) {
            this.countyService.remove(this.model.id).subscribe(
                resp => {
                    this.resetForm();
                    this.popupDeleteCounty.hide();
                    this.refreshDataTable();
                },
                error => this.alertService.error(error)
            );
        }
    }

    onSearchFormSubmit(searchCountyForm: NgForm) {
        if (searchCountyForm.valid) {
            this.dropDownList.cityList$.pipe(
                take(1),
                map(data => data.find(x => x.id == this.searchParams.cityId))
            ).subscribe(
                response => {
                    const cityName = response ? response.name : '';
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
            );
        }
    }

    //#endregion

}
