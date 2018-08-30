using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace WACLIM.Controllers
{
    public class LanguagesController : Controller
    {
        // GET: Languages
        public ActionResult ChangeLanguage(string culture, string returnUrl)
        {
            if (culture != null)
            {
                Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(culture);
                Thread.CurrentThread.CurrentUICulture = new CultureInfo(culture);
            }

            HttpCookie httpCookie = new HttpCookie("Language");
            httpCookie.Value = culture;
            Response.Cookies.Add(httpCookie);

            if (!String.IsNullOrEmpty(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }
    }
}