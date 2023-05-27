
using AspNetTemplate.Services;
using AtomicGoons.Data;
using AtomicGoons.Data.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("AtomicGoonsIdentityDbContextConnection") ?? throw new InvalidOperationException("Connection string 'AtomicGoonsIdentityDbContextConnection' not found.");

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddTransient<IEmailSender, EmailSender>();

// Authentication
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
    {
        options.LoginPath = "/Login";
        options.AccessDeniedPath = "/Denied";
    });

builder.Services.AddScoped<IUserDataService, UserDataService>();
//
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("AtomicGoonsUserDataConnection") ?? throw new InvalidOperationException()));
//
// builder.Services.AddDbContext<AtomicGoonsAuth>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("AtomicGoonsAuthConnection") ?? throw new InvalidOperationException()));

// builder.Services.AddDefaultIdentity<AtomicGoonsUserData>(options =>
//     options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<AtomicGoonsAuth>();

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite(connectionString));


builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<AppDbContext>();

// Add services to the container.
builder.Services.AddControllersWithViews();
//builder.Services.AddRazorPages();
builder.Services.AddTransient<IEmailSender, EmailSender>();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapRazorPages();

app.Run();