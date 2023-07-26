using System.Security.Claims;
using AtomicGoons.Data.Services;
using AtomicGoons.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace AtomicGoons.Controllers;

public class LegendsController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IUserSettingsService _service;

    public LegendsController(ILogger<HomeController> logger, IUserSettingsService service)
    {
        _logger = logger;
        _service = service;
    }

    
    public async Task<IActionResult> Index()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var userData = await _service.GetAllUserSettingsAsync();
        
        var userSettingsViewModel = new UserSettingsViewModel()
        {
            
            CurrentUserSetting = userData.FirstOrDefault(x => x.UserId == userId), 
            AllUserSettings = userData
        };
        
        return View("Index", userSettingsViewModel);
    }
    
   
    
    // [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    // public IActionResult Error()
    // {
    //     return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    // }
    
    
}