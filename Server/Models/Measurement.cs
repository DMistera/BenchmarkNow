using System.ComponentModel.DataAnnotations;

namespace BenchmarkNow {
    public class Measurement {
        [Key]
        public long Id { get; set; }
        public string IpAddress { get; set; }
        public string Browser { get; set; }
        public IEnumerable<AlgorithmMeasurement> AlgorithmMeasurements { get; set; } 
        public DateTime Date { get; set; }
    }
}
