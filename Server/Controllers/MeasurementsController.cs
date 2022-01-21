using Microsoft.AspNetCore.Mvc;
using UAParser;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BenchmarkNow
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeasurementsController : ControllerBase
    {
        private ApplicationDbContext dbContext;

        public MeasurementsController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // POST api/Measurements
        [HttpPost]
        public async Task<ActionResult<AlgorithmMeasurement>> Post([FromBody] IEnumerable<AlgorithmMeasurement> algorithmMeasurements)
        {
            foreach(AlgorithmMeasurement algorithmMeasurement in algorithmMeasurements) {
                Algorithm algorithm = dbContext.Set<Algorithm>().Find(algorithmMeasurement.Algorithm.Name);
                if (algorithm != null) {
                    algorithmMeasurement.Algorithm = algorithm;
                }
            }
            var userAgent = HttpContext.Request.Headers["User-Agent"];
            var uaParser = Parser.GetDefault();
            ClientInfo c = uaParser.Parse(userAgent);
            var browser = c.UA.Family + " " + c.UA.Major + "." + c.UA.Minor;
            Measurement measurement = new() {
                AlgorithmMeasurements = algorithmMeasurements,
                IpAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString(),
                Browser = browser,
                Date = DateTime.Now
            };
            dbContext.Measurements.Add(measurement);
            await dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
