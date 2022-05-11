import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      {
        path: 'dash',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { titulo: 'Progress' },
      },
      {
        path: 'graficas',
        component: Graficas1Component,
        data: { titulo: 'Gráficas' },
      },
      {
        path: 'account',
        component: AccountSettingComponent,
        data: { titulo: 'Account Setting' },
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { titulo: 'Promesas' },
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: { titulo: 'Rxjs' },
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        data: { titulo: 'Perfil' },
      },
      {
        path: '',
        redirectTo: 'dash',
        pathMatch: 'full',
      },

      // Mantenimientos
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: { titulo: 'Usuarios Apliciaciones' },
      },
      {
        path: 'medicos',
        component: MedicosComponent,
        data: { titulo: 'Medicos Aplicacions' },
      },
      {
        path: 'hospitales',
        component: HospitalesComponent,
        data: { titulo: 'Hospitales Aplicaciones' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
