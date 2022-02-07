import { Component } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: [],
})
export class Graficas1Component {
  public label: string[] = ['Computadores Escritorio', 'Portatil', 'Tablet'];
  public data: number[] = [123, 330, 400];
}
