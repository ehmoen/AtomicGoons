using System.Diagnostics;
using System.Security.Claims;
using AtomicGoons.ViewModels;
using AtomicGoons.Data.Services;
using Microsoft.AspNetCore.Mvc;
using AtomicGoons.Models;

namespace AtomicGoons.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IUserSettingsService _service;

    // public HomeController(ILogger<HomeController> logger, IUserSettingsService service)
    // {
    //     _logger = logger;
    //     _service = service;
    // }

    public IActionResult Index()
    {
        return View();
    }
    
    // public IActionResult AtomicGoons()
    // {
    //     return View();
    // }
    
    // public async Task<IActionResult> MyUserData()
    // {
    //     var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    //
    //     var userData = await _service.GetUserDataByUserIdAsync(userId);
    //     
    //     var userDataVm = new UserDataVM()
    //     {
    //         CurrentUserData = userData
    //     };
    //     
    //     return View(userDataVm);
    // }
    
    // public async Task<IActionResult> Legends()
    // {
    //     var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    //
    //     var userData = await _service.GetAllUserDataAsync();
    //     
    //     var userDataVm = new UserDataVM()
    //     {
    //         
    //         CurrentUserData = userData.FirstOrDefault(x => x.UserId == userId), 
    //         AllUserData = userData
    //     };
    //     
    //     return View("Legends", userDataVm);
    // }
    //
    // public IActionResult Games()
    // {
    //     return View();
    // }
    //
    // public IActionResult GameTemplate()
    // {
    //     return View();
    // }
    //
    // public IActionResult Game()
    // {
    //     return View();
    // }
    
    // [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    // public IActionResult Error()
    // {
    //     return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    // }
    
    // [HttpPost]
    // public async Task<IActionResult> UpdateUserData(int score)
    // {
    //     var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    //
    //     //TODO: return error and handel it...
    //     if (userId == null) return new JsonResult(score);
    //     var userData = await _service.GetUserDataByUserIdAsync(userId);
    //
    //     if (userData != null)
    //     {
    //         if (score > userData.Score)
    //         {
    //             userData.Score = score;
    //         }
    //     }
    //     else
    //     {
    //         userData = new UserData()
    //         {
    //             Score = score,
    //             Settings = "MySettings",
    //             UserId = userId
    //         };
    //     }
    //
    //     await _service.SaveUserDataAsync(userData, userId);
    //
    //     return new JsonResult(score);
    // }
}