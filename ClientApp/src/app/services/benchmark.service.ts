import { Injectable } from '@angular/core';
import { AlgorithmMeasurement } from '../models/algorithm-measurement';
import { AlgorithmMeasurementResult } from '../models/algorithm-measurement-result';
import { BinarytreesService } from './algorithms/binarytrees.service';
import { BenchmarkAlgorithm } from '../models/benchmark-algorithm';
import { AlgorithmMeasurementState } from '../models/algorithm-measurement-state';
import { HttpClient } from '@angular/common/http';
import { NbodyService } from './algorithms/nbody.service';
import { SpectralNormService } from './algorithms/spectral-norm.service';
import { FastaService } from './algorithms/fasta.service';
import { SettingsService } from './settings.service';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class BenchmarkService {

  constructor(
    private binaryTreesService: BinarytreesService,
    private nbodyService: NbodyService,
    private spectralNormService: SpectralNormService,
    private fastaService: FastaService,
    private http: HttpClient,) {
    }

  private iterations : number;
  private algorithms : AlgorithmInstance[];

  public createInitialMeasurements(settings: Settings) : AlgorithmMeasurement[] {
    this.iterations = settings.iterations;
    this.algorithms = [
      { algorithm: this.binaryTreesService, parameter: settings.binaryTrees },
      { algorithm: this.nbodyService, parameter: settings.nBody },
      { algorithm: this.spectralNormService, parameter: settings.spectralNorm },
      { algorithm: this.fastaService, parameter: settings.fasta }
    ];
    return this.algorithms.map(a => {
      return {
        algorithm: a.algorithm,
        parameter: a.parameter,
        state: AlgorithmMeasurementState.READY,
        result: undefined
      }
    })
  }

  public benchmarkAlgorithm(algorithmMeasurement: AlgorithmMeasurement) : AlgorithmMeasurementResult {
    let sum = 0;
    for (let i = 0; i < this.iterations; i++) {
      let startTime = performance.now();
      algorithmMeasurement.algorithm.run(algorithmMeasurement.parameter)
      this.binaryTreesService.run(16);
      let endTime = performance.now()
      let time = endTime - startTime;
      sum += time;
    }
    let averageTime = sum / this.iterations;
    return {
      averageTime: Math.round(averageTime),
      standardDeviation: 0 // TODO
    };
  }

  public sendResults(measurements: AlgorithmMeasurement[] ) {
    this.http.post("/api/measurements", measurements).subscribe();
  }
}

interface AlgorithmInstance {
  algorithm: BenchmarkAlgorithm;
  parameter: number;
}
