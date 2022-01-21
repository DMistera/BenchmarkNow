import { Component, OnInit } from '@angular/core';
import { AlgorithmMeasurement } from 'src/app/models/algorithm-measurement';
import { AlgorithmMeasurementState } from 'src/app/models/algorithm-measurement-state';
import { BenchmarkService } from 'src/app/services/benchmark.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-measurement-view',
  templateUrl: './measurement-view.component.html',
  styleUrls: ['./measurement-view.component.css']
})
export class MeasurementViewComponent implements OnInit {

  algorithmMeasurements: AlgorithmMeasurement[];

  constructor(private benchmarkService: BenchmarkService, private settingsService: SettingsService) {
    this.settingsService.get().subscribe(settings => {
      this.algorithmMeasurements = this.benchmarkService.createInitialMeasurements(settings);
    });
  }

  ngOnInit(): void {
  }

  startBenchmark() {
    var i = 0;
    this.benchmarkChain(i);
  }

  benchmarkChain(i : number) {
    setTimeout(() => {
      let algorithmMeasurement = this.algorithmMeasurements[i];
      algorithmMeasurement.state = AlgorithmMeasurementState.IN_PROGRESS;
      setTimeout(() => {
        algorithmMeasurement.result = this.benchmarkService.benchmarkAlgorithm(algorithmMeasurement);
        algorithmMeasurement.state = AlgorithmMeasurementState.FINISHED;
        if(i < this.algorithmMeasurements.length - 1) {
          i++;
          this.benchmarkChain(i);
        }
        else {
          this.benchmarkService.sendResults(this.algorithmMeasurements);
        }
      })
    });
  }

}


