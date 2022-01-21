import { BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'src/app/models/chart-data';
import { ScreenService } from 'src/app/services/screen.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() chartData: ChartData;
  data: any[];

  isBelowMd!: boolean;

  constructor(private screenService: ScreenService) { }

  ngOnInit(): void {
    this.data = this.chartData.bars.map(bar => {
      return {
        name: bar.label,
        value: bar.value
      }
    })
  }

  ngAfterViewInit(): void {
    this.screenService.isBelowMd().subscribe((isBelowXl: BreakpointState) => {
      this.isBelowMd = isBelowXl.matches;
    });
  }
}
