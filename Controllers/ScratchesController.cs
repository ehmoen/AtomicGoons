using Microsoft.AspNetCore.Mvc;

namespace AtomicGoons.Controllers;

public class ScratchesController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View("CanvasStuff");
    }
}