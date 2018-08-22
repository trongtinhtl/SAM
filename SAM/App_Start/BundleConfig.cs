using System.Web;
using System.Web.Optimization;

namespace SAM
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Assets/plugins/jquery/jquery-3.3.1.min.js",
                        "~/Assets/plugins/jquery/ jquery-migrate.min.js",
                        "~/Assets/plugins/bootstrap-4.0.0/bootstrap.min.js",
                        "~/Assets/js/template/flexslider.min.js",
                        "~/Assets/js/template/functions.js"
                        ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Assets/plugins/bootstrap-4.0.0/css/bootstrap.min.css",
                      "~/Assets/plugins/font-awesome/font-awesome.css",
                      "~/Assets/css/customizer_preview.css",
                      "~/Assets/css/editor-style.css",
                      "~/Assets/css/style.css",
                      "~/Assets/css/slider.css"
                      ));
        }
    }
}
