using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.IO.Pipelines;

namespace AtomicGoons.Models
{
    public class AtomicGoonsDbContext : IdentityDbContext
    {
        public AtomicGoonsDbContext(DbContextOptions<AtomicGoonsDbContext> options) : base(options)
        {
        }

        public DbSet<UserSetting> UserSettings { get; set; }
    }
}
