using System.Configuration;
using AtomicGoons.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using AtomicGoons.Data;
using AtomicGoons.Data.Base;
using AtomicGoons.Data.Services;
using AtomicGoons.Services;
using Microsoft.AspNetCore.Identity.UI.Services;
using System;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("AtomicGoonsDbContextConnection") ?? throw new InvalidOperationException("Connection string 'BethanysPieShopDbContextConnection' not found.");

builder.Services.AddDbContext<AtomicGoonsDbContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<AtomicGoonsDbContext>();

builder.Services.AddControllersWithViews();
    // .AddJsonOptions(options =>
    // {
    //     options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    // });
    

builder.Services.Configure<EmailSenderOptions>(builder.Configuration.GetSection("EmailSenderOptions"));


builder.Services.AddTransient<IEmailSender, EmailSender>();
builder.Services.AddScoped<IUserSettingsService, UserSettingsService>();

builder.Services.AddRazorPages();



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseStaticFiles();

//app.UseSession();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapRazorPages();

app.Run();
