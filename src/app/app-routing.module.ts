import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';
import { AuthGuard } from './guards/auth.guard';

const route: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    component: NopagesfoundComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(route)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
