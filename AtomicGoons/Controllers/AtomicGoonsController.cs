using System.Diagnostics;
using System.Security.Claims;
using AtomicGoons.ViewModels;
using AtomicGoons.Data.Services;
using Microsoft.AspNetCore.Mvc;
using AtomicGoons.Models;

namespace AtomicGoons.Controllers;

public class AtomicGoonsController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IUserSettingsService _service;

    public AtomicGoonsController(ILogger<HomeController> logger, IUserSettingsService service)
    {
        _logger = logger;
        _service = service;
    }

    public IActionResult Index()
    {
        return View();
    }
    
    //
    // [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    // public IActionResult Error()
    // {
    //     return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    // }
    
    [HttpPost]
    public async Task<IActionResult> UpdateUserSetting(int score)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        //TODO: return error and handel it...
        if (userId == null) return new JsonResult(score);
        var userSetting = await _service.GetUserSettingsByUserIdAsync(userId);

        if (userSetting != null)
        {
            if (score > userSetting.Score)
            {
                userSetting.Score = score;
            }
        }
        else
        {
            userSetting = new UserSetting()
            {
                Score = score,
                Settings = "MySettings",
                UserId = userId
            };
        }

        await _service.SaveUserSettingsAsync(userSetting, userId);

        return new JsonResult(score);
    }
}