using AtomicGoons.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AtomicGoons.Data;

public class AtomicGoonsDbContext : IdentityDbContext<IdentityUser>
{
    public AtomicGoonsDbContext(DbContextOptions<AtomicGoonsDbContext> options) : base(options)
    {
    }

    public DbSet<UserSetting> UserSettings { get; set; }
}
