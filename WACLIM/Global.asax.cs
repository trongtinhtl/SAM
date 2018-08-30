using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace WACLIM
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void Application_BeginRequest(object sender, EventArgs e) {

            HttpCookie httpCookie = HttpContext.Current.Request.Cookies["Language"];
            if (httpCookie != null && httpCookie.Value != null)
            {
                System.Threading.Thread.CurrentThread.CurrentCulture = new CultureInfo(httpCookie.Value);
                System.Threading.Thread.CurrentThread.CurrentUICulture = new CultureInfo(httpCookie.Value);
            }
            else {
                System.Threading.Thread.CurrentThread.CurrentCulture = new CultureInfo("vi-VN");
                System.Threading.Thread.CurrentThread.CurrentUICulture = new CultureInfo("vi-VN");
            }
        }
    }
}
