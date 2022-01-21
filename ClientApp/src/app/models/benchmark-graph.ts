export interface BenchmarkGraph {
  title: string;
  data: BenchmarkGraphPoint[];
}

export interface BenchmarkGraphPoint {
  label: string;
  value: number;
}
