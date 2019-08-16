import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '@app/core/guards/authentication.guard';


const routes: Routes = [
  // Main layout
  {
    path: '',
    canActivate: [AuthenticationGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        loadChildren: () => import('@app/modules/home/home.module').then(mod => mod.HomeModule)
      },
      {
        path: 'master-data',
        loadChildren: () => import('@app/modules/master-data/master-data.module').then(mod => mod.MasterDataModule)
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'user',
        loadChildren: () => import('@app/modules/user/user.module').then(mod => mod.UserModule)
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
