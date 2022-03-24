import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';

declare function customInitFuncion(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor(private setting: SettingService) {}

  ngOnInit(): void {
    customInitFuncion();
  }
}
