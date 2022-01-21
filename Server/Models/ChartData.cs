namespace BenchmarkNow {
    public class ChartData {
        public string Title { get; set; }
        public List<ChartBar> Bars { get; set; }

        public ChartBar FindBar(string label) {
            return Bars.FirstOrDefault(b => b.Label.Equals(label));
        }
    }
}
