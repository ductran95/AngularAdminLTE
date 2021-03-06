import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityComponent } from '@app/modules/master-data/city/city.component';
import { CountyComponent } from '@app/modules/master-data/county/county.component';
import { MainLayoutComponent } from '@app/shared/layouts/main-layout/main-layout.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'city',
        component: CityComponent
      },
      {
        path: 'county',
        component: CountyComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule { }
