using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BenchmarkNow.Server.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase {

        private ApplicationDbContext dbContext;

        public SettingsController(ApplicationDbContext dbContext) {
            this.dbContext = dbContext;
        }

        // GET: api/<SettingsController>
        [HttpGet]
        public async Task<SettingsDTO> Get() {
            string ip = Request.HttpContext.Connection.RemoteIpAddress.ToString();
            Settings result = await dbContext.Settings.FindAsync(ip);
            if(result == null) {
                Settings defaultSettings = CreateDefaultSettings();
                defaultSettings.IpAddress = ip;
                await dbContext.Settings.AddAsync(defaultSettings);
                await dbContext.SaveChangesAsync();
                return new SettingsDTO(defaultSettings);
            }
            else {
                return new SettingsDTO(result);
            }
        }

        // PUT api/<SettingsController>/5
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] SettingsDTO value) {
            Settings settings = value.ToSettings(Request.HttpContext.Connection.RemoteIpAddress.ToString());
            bool result = await dbContext.Settings.AnyAsync(s => s.IpAddress == settings.IpAddress);
            if (result) {
                dbContext.Entry(settings).State = EntityState.Modified;
            }
            else {
                await dbContext.Settings.AddAsync(settings);
            }
            await dbContext.SaveChangesAsync();
            return Ok();
        }

        private Settings CreateDefaultSettings() {
            return new Settings {
                Iterations = 5,
                BinaryTrees = 15,
                NBody = 10000,
                SpectralNorm = 1000,
                Fasta = 2000
            };
        }
    }
}
