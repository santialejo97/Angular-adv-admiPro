import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      {
        path: 'dash',
        component: DashboardComponent,
      },
      {
        path: 'progress',
        component: ProgressComponent,
      },
      {
        path: 'graficas',
        component: Graficas1Component,
      },
      {
        path: 'account',
        component: AccountSettingComponent,
      },
      {
        path: '',
        redirectTo: 'dash',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
