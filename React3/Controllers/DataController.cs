using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using React2.Helpers;
using React2.Model;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace React2.Controllers
{
    [Route("api/[controller]")]
    public class DataController : Controller
    {
        const string URL = "https://keyninja-internal.azurewebsites.net";

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> PostLogin([FromBody] LoginModel login)
        {
            string url = $@"{URL}/api/MobileLogin/Login";
            object data = null;
            var ok = true;
            var error = "";

            JToken jToken = null;
            try
            {
                jToken = HttpHelper.PostHttpRequest(url, login, null);
                data = jToken["userId"];
                ok = bool.TryParse(jToken["isSuccessful"].ToString(), out ok);
                error = jToken["failedReason"].ToString();
            }
            catch (Exception ex)
            {
                Console.WriteLine("\nMessage ---\n{0}", ex.Message);
                ok = false;
                error = "error with login";
            }
            return new JsonResult(new { error, ok, data });
        }
    }
}
