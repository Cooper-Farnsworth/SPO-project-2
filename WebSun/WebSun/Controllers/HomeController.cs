using Microsoft.AspNetCore.Mvc;

namespace MyMvcApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View(); // Открываем View из папки Views/Home/Index.cshtml
        }
    }
}