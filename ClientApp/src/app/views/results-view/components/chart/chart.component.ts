import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'src/app/models/chart-data';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() chartData: ChartData;
  data: any[];

  constructor() { }

  ngOnInit(): void {
    this.data = this.chartData.bars.map(bar => {
      return {
        name: bar.label,
        value: bar.value
      }
    })
  }

}
