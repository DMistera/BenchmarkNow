using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BenchmarkNow.Server.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class BenchmarkResultController : ControllerBase {

        private ApplicationDbContext dbContext;

        public BenchmarkResultController(ApplicationDbContext dbContext) {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<BenchmarkResult> Get() {
            string ipAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString();
            List<Measurement> measurements = dbContext.Measurements
                .Include(m => m.AlgorithmMeasurements)
                .ThenInclude(m => m.Algorithm)
                .Include(m => m.AlgorithmMeasurements)
                .ThenInclude(m => m.Result)
                .Where(m => m.IpAddress == ipAddress)
                .ToList();
            Dictionary<string, ChartData> map = new Dictionary<string, ChartData>();
            foreach (Measurement measurement in measurements) {
                foreach (AlgorithmMeasurement algorithmMeasurement in measurement.AlgorithmMeasurements) {
                    string algorithmName = algorithmMeasurement.Algorithm.Name + " (" + algorithmMeasurement.Parameter + ")";
                    if (!map.ContainsKey(algorithmName)) {
                        map.Add(algorithmName, new ChartData() {
                            Title = algorithmName,
                            Bars = new List<ChartBar>()
                        });
                    }
                    ChartData chartData = map[algorithmName];
                    ChartBar chartBar = chartData.FindBar(measurement.Browser);
                    if(chartBar == null) {
                        chartData.Bars.Add(new ChartBar() {
                            Label = measurement.Browser,
                            Value = algorithmMeasurement.Result.AverageTime,
                            Date = measurement.Date
                        });
                    }
                    else {
                        if(chartBar.Date < measurement.Date) {
                            chartBar.Date = measurement.Date;
                            chartBar.Value = algorithmMeasurement.Result.AverageTime;
                        }
                    }
                }
            }
            return new BenchmarkResult() {
                Charts = map.Values.ToList()
            };
        }
    }
}
