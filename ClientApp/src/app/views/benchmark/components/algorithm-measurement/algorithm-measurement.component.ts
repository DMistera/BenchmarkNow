import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmMeasurement } from 'src/app/models/algorithm-measurement';
import { AlgorithmMeasurementState } from 'src/app/models/algorithm-measurement-state';

@Component({
  selector: 'app-algorithm-measurement',
  templateUrl: './algorithm-measurement.component.html',
  styleUrls: ['./algorithm-measurement.component.css']
})
export class AlgorithmMeasurementComponent implements OnInit {

  @Input()
  algorithmMeasurement!: AlgorithmMeasurement;

  constructor() { }

  ngOnInit(): void {
  }

  isInProgress(){
    return this.algorithmMeasurement.state==AlgorithmMeasurementState.IN_PROGRESS
  }

  getStateString(): string {
    switch(this.algorithmMeasurement.state) {
      case AlgorithmMeasurementState.READY:
        return "Ready"
      case AlgorithmMeasurementState.IN_PROGRESS:
        return "In Progress..."
      case AlgorithmMeasurementState.FINISHED:
        return "Finished"
      default:
        throw Error("Invalid state");
    }
  }

}
