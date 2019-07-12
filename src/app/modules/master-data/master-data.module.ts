import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { CityComponent } from '@app/modules/master-data/city/city.component';
import { MasterDataRoutingModule } from '@app/modules/master-data/master-data-routing.module';
import { CountyComponent } from './county/county.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [CityComponent, CountyComponent],
  imports: [
    CommonModule,
    MasterDataRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ]
})
export class MasterDataModule { }
