import { Injectable } from '@angular/core';
import { Menu } from '../interfaces/sidebar.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu!: Menu[];

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu') || '') || [];
  }

  constructor() {}
}
