namespace BenchmarkNow {
    public class SettingsDTO {
        public int Iterations { get; set; }
        public int BinaryTrees { get; set; }
        public int NBody { get; set; }
        public int SpectralNorm { get; set; }
        public int Fasta { get; set; }

        public SettingsDTO() {
        }

        public SettingsDTO(Settings settings) {
            Iterations = settings.Iterations;
            BinaryTrees = settings.BinaryTrees;
            NBody = settings.NBody;
            SpectralNorm = settings.SpectralNorm;
            Fasta = settings.Fasta;
        }

        public Settings ToSettings(string ipAddress) {
            return new Settings() {
                IpAddress = ipAddress,
                Iterations = Iterations,
                BinaryTrees = BinaryTrees,
                NBody = NBody,
                SpectralNorm = SpectralNorm,
                Fasta = Fasta
            };
        }
    }
}
