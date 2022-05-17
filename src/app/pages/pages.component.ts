import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFuncion(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor(
    private setting: SettingService,
    private sidebar: SidebarService
  ) {}

  ngOnInit(): void {
    this.sidebar.cargarMenu();
    customInitFuncion();
  }
}
