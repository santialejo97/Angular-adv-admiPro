import { Injectable } from '@angular/core';
import { Menu } from '../interfaces/sidebar.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: Menu[] = [
    {
      title: 'Dashborad',
      icon: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: 'dash' },
        { titulo: 'Progress', url: 'progress' },
        { titulo: 'Graphis', url: 'graficas' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'Rxjs', url: 'rxjs' },
      ],
    },
    {
      title: 'Mantenimientos',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Hospitales', url: 'hospitales' },
        { titulo: 'Médicos', url: 'medicos' },
      ],
    },
  ];

  constructor() {}
}
