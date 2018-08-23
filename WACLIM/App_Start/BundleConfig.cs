using System.Web;
using System.Web.Optimization;

namespace WACLIM
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
                      "~/Assets/css/slider.css",
					  "~/Assets/css/custom.css"
					  ));


			bundles.Add(new ScriptBundle("~/bundles/admin-plugins").Include(
						"~/Assets/plugins/jquery/jquery-3.3.1.min.js",
						"~/Assets/plugins/jquery/ jquery-migrate.min.js",
						"~/Assets/plugins/froala/js/froala_editor.min.js"
					   ));

			bundles.Add(new StyleBundle("~/Content/admin-plugins").Include(
						"~/Assets/plugins/froala/css/froala_editor.min.css",
						"~/Assets/plugins/froala/css/froala_style.min.css"
					  ));

			bundles.Add(new ScriptBundle("~/bundles/admin-layout").Include(						
						"~/Assets/Admin/js/bootstrap.min.js",
						"~/Assets/Admin/js/plugins.js",
						"~/Assets/Admin/js/main.js"
					   ));

			bundles.Add(new StyleBundle("~/Content/admin-layout").Include(
					  "~/Assets/Admin/css/bootstrap.min.css",
					  "~/Assets/Admin/css/bootstrap-select.css",
					  "~/Assets/Admin/css/font-awesome.min.css",
					  "~/Assets/Admin/css/style.css",
					  "~/Assets/Admin/css/normalize.css",
					  "~/Assets/Admin/css/themify-icons.css",
					  "~/Assets/Admin/css/animate.css",
					  "~/Assets/Admin/css/gausejs.css",
					  "~/Assets/Admin/css/cs-skin-elastic.css"
					  ));
		}
    }
}
