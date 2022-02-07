import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
})
export class DonaComponent implements OnChanges {
  @Input() title: string = 'Sin titulo';
  @Input('data') data: number[] = [350, 450, 100];
  @Input('label') doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: this.data,
        backgroundColor: ['#6857R6', '#009FEE', '#F02059'],
      },
    ],
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: this.data,
          backgroundColor: ['#6857R6', '#009FEE', '#F02059'],
        },
      ],
    };
  }
}
