import { AlgorithmMeasurementResult } from "./algorithm-measurement-result";
import { AlgorithmMeasurementState } from "./algorithm-measurement-state";
import { BenchmarkAlgorithm } from "./benchmark-algorithm";

export interface AlgorithmMeasurement {
  algorithm: BenchmarkAlgorithm;
  parameter: number;
  state: AlgorithmMeasurementState;
  result: AlgorithmMeasurementResult | undefined;
}
