import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { apiUrls } from '@app/core/constants/apiUrls';
import { HttpClient } from '@angular/common/http';
import { SidebarItemModel } from '@app/core/models/sidebar-item-model';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    //#region Properties

    private baseUrl = environment.baseUrl;
    private apiUrl = apiUrls.layout;

    //#endregion

    //#region Constructors

    constructor(private http: HttpClient) { }

    //#endregion

    //#region Funtions

    getSidebarMenu() {
        return this.http.get<SidebarItemModel[]>(this.baseUrl + this.apiUrl.getSidebarMenu);
    }

    //#endregion
}
