import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityComponent } from '@app/modules/master-data/city/city.component';
import { CountyComponent } from '@app/modules/master-data/county/county.component';


const routes: Routes = [
  {
    path: 'city',
    component: CityComponent
  },
  {
    path: 'county',
    component: CountyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule { }