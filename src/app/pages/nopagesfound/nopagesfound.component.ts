import { Component } from '@angular/core';

@Component({
  selector: 'app-nopagesfound',
  templateUrl: './nopagesfound.component.html',
  styleUrls: ['./nopagesfound.component.css'],
})
export class NopagesfoundComponent {
  year: number = new Date().getFullYear();
}
