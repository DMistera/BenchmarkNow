using Microsoft.EntityFrameworkCore;

namespace BenchmarkNow
{
    public class ApplicationDbContext : DbContext
    {
        private IConfiguration configuration;
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration configuration) : base(options)
        {
            this.configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DbContext"));
        }

        public DbSet<Measurement> Measurements { get; set; }
        public DbSet<Settings> Settings { get; set; }
    }
}
