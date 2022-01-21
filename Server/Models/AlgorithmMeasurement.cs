using System.ComponentModel.DataAnnotations;

namespace BenchmarkNow
{
    public class AlgorithmMeasurement
    {
        [Key]
        public long Id { get; set; }
        public Algorithm Algorithm { get; set; }
        public int Parameter { get; set; }
        public AlgorithmMeasurementResult Result { get; set; }
    }
}
