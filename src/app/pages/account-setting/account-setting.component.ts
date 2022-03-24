import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: [],
})
export class AccountSettingComponent implements OnInit {
  constructor(private setting: SettingService) {}

  ngOnInit(): void {
    this.setting.checkCurrentTheme();
  }

  changeThema(theme: string) {
    this.setting.changeThema(theme);
  }
}
