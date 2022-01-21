using System.ComponentModel.DataAnnotations;

namespace BenchmarkNow {
    public class AlgorithmMeasurementResult {
        [Key]
        public long Id { get; set; }
        public float AverageTime { get; set; }
        public float StandardDeviation { get; set; }
    }
}
