import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '@app/shared/layouts/main-layout/main-layout.component';
import { AuthenticationGuard } from '@app/core/guards/authentication.guard';


const routes: Routes = [
  // Main layout
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthenticationGuard],
    runGuardsAndResolvers: "always",
    children: [
      {
        path: 'master-data',
        loadChildren: './modules/master-data/master-data.module#MasterDataModule'
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'user',
        loadChildren: './modules/user/user.module#UserModule'
      }
    ]
  },
  // Redirect to main page
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }