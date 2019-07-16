import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataTableComponent } from '@app/shared/components/data-table/data-table.component';
import { PopupComponent } from '@app/shared/components/popup/popup.component';
import { MainLayoutComponent } from '@app/shared/layouts/main-layout/main-layout.component';
import { MainLayoutHeaderComponent } from '@app/shared/layouts/main-layout-header/main-layout-header.component';
import { MainLayoutFooterComponent } from '@app/shared/layouts/main-layout-footer/main-layout-footer.component';
import { MainLayoutPageHeaderComponent } from '@app/shared/layouts/main-layout-page-header/main-layout-page-header.component';
import { MainLayoutSidebarComponent } from '@app/shared/layouts/main-layout-sidebar/main-layout-sidebar.component';
import { MainLayoutSettingComponent } from '@app/shared/layouts/main-layout-setting/main-layout-setting.component';
import { IcheckDirective } from './directives/icheck.directive';


@NgModule({
  declarations: [
    DataTableComponent,
    PopupComponent,
    MainLayoutComponent,
    MainLayoutHeaderComponent,
    MainLayoutFooterComponent,
    MainLayoutPageHeaderComponent,
    MainLayoutSidebarComponent,
    MainLayoutSettingComponent,
    IcheckDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MainLayoutComponent,
    MainLayoutHeaderComponent,
    MainLayoutFooterComponent,
    MainLayoutPageHeaderComponent,
    MainLayoutSidebarComponent,
    MainLayoutSettingComponent,
    DataTableComponent,
    PopupComponent,
    IcheckDirective
  ]
})
export class SharedModule { }
