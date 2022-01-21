using System.ComponentModel.DataAnnotations;

namespace BenchmarkNow {
    public class Settings {
        [Key]
        public string IpAddress { get; set; }
        public int Iterations { get; set; }
        public int BinaryTrees { get; set; }
        public int NBody { get; set; }
        public int SpectralNorm { get; set; }
        public int Fasta { get; set; }
    }
}
