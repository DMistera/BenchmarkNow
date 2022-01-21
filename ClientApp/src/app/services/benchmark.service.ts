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

@Injectable({
  providedIn: 'root'
})
export class BenchmarkService {

  constructor(
    private binaryTreesService: BinarytreesService,
    private nbodyService: NbodyService,
    private spectralNormService: SpectralNormService,
    private fastaService: FastaService,
    private http: HttpClient) { }

  private readonly iterations = 5;
  private readonly algorithms : AlgorithmInstance[] = [
    { algorithm: this.binaryTreesService, parameter: 15 },
    { algorithm: this.nbodyService, parameter: 10000 },
    { algorithm: this.spectralNormService, parameter: 1000 },
    { algorithm: this.fastaService, parameter: 2000 }
  ]

  public createInitialMeasurements() : AlgorithmMeasurement[] {
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
