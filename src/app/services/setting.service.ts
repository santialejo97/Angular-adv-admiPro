import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private linkTheme = document.querySelector('#theme');
  private url!: string;

  constructor() {
    this.url =
      localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme?.setAttribute('href', this.url);
  }

  changeThema(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const selectorsTheme = document.querySelectorAll('.selector');
    selectorsTheme.forEach((element) => {
      if (element.classList.contains('working')) {
        element.classList.remove('working');
      }
      const btnselector = element.getAttribute('data-theme');
      const url = `./assets/css/colors/${btnselector}.css`;
      if (url === this.linkTheme?.getAttribute('href')) {
        element.classList.add('working');
      }
    });
  }
}
