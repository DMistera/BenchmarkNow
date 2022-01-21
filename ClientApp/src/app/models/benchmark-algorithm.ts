export interface BenchmarkAlgorithm {
  name: string;
  run(n : number): void;
}
