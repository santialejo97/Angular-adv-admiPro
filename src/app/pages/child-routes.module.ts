import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminGuard } from '../guards/admin.guard';

import { AccountSettingComponent } from './account-setting/account-setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { RouterModule, Routes } from '@angular/router';

const childRoutes: Routes = [
  {
    path: 'dash',
    component: DashboardComponent,
    data: { titulo: 'Dashboard' },
  },
  {
    path: 'graficas',
    component: Graficas1Component,
    data: { titulo: 'Gráficas' },
  },
  {
    path: 'buscar/:termino',
    component: BusquedaComponent,
    data: { titulo: 'busqueda' },
  },
  {
    path: 'progress',
    component: ProgressComponent,
    data: { titulo: 'Progress' },
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
    data: { titulo: 'Mantenimiento Usuarios' },
    canActivate: [AdminGuard],
  },
  {
    path: 'medicos',
    component: MedicosComponent,
    data: { titulo: 'Mantenimiento Medicos' },
  },
  {
    path: 'medico/:id',
    component: MedicoComponent,
    data: { titulo: 'Mantenimiento Medico' },
  },
  {
    path: 'hospitales',
    component: HospitalesComponent,
    data: { titulo: 'Mantenimiento Hospitales' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
