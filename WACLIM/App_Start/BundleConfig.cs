using System.Web;
using System.Web.Optimization;

namespace WACLIM
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
			#region WEB
			bundles.Add(new ScriptBundle("~/bundles/plugins").Include(
                        "~/Assets/plugins/jquery/jquery-3.3.1.min.js",
                        "~/Assets/plugins/jquery/jquery-migrate.min.js",
                        "~/Assets/plugins/jquery-validation/jquery.validate.js",
                        "~/Assets/plugins/jquery-validation/localization/messages_vi.js",
                        "~/Assets/plugins/bootstrap/js/bootstrap.min.js",
						"~/Assets/plugins/jquery-loadingModal/js/jquery.loadingModal.js",
						"~/Assets/js/template/flexslider.min.js",
                        "~/Assets/js/template/functions.js"
						));

			bundles.Add(new ScriptBundle("~/bundles/js").Include(
						"~/Assets/js/vmodule.js",
						"~/Assets/js/GLOBAL.js",
						"~/Assets/js/Ajax/ThanhVienAjax.js",
						"~/Assets/js/Ajax/BanTinAjax.js",
						"~/Assets/js/Ajax/TestAjax.js"
						));

			bundles.Add(new StyleBundle("~/Content/plugins").Include(
                      "~/Assets/plugins/bootstrap/css/bootstrap.min.css",
                      "~/Assets/plugins/font-awesome/font-awesome.css",
					  "~/Assets/plugins/jquery-loadingModal/css/jquery.loadingModal.css"
					  ));

			bundles.Add(new StyleBundle("~/Content/css").Include(
					  "~/Assets/css/customizer_preview.css",
					  "~/Assets/css/editor-style.css",
					  "~/Assets/css/style.css",
					  "~/Assets/css/slider.css",
					  "~/Assets/css/custom.css"
					  ));
			#endregion

			#region Trang Admin
			bundles.Add(new ScriptBundle("~/bundles/admin-plugins").Include(
						"~/Assets/plugins/jquery/jquery-3.3.1.min.js",
                        "~/Assets/plugins/bootstrap/js/bootstrap.bundle.min.js",
                        "~/Assets/plugins/froala/js/froala_editor.pkgd.min.js",
                        "~/Assets/plugins/froala/js/languages/vi.js",
                        "~/Assets/plugins/jquery-loadingModal/js/jquery.loadingModal.js",
                        "~/Assets/plugins/perfect-scrollbar/perfect-scrollbar.min.js",
                        "~/Assets/plugins/jquery-validation/jquery.validate.js",
                        "~/Assets/plugins/jquery-validation/additional-method.js",
                        "~/Assets/plugins/jquery-validation/localization/messages_vi.js",
                        "~/Assets/plugins/jquery-confirm/jquery-confirm.min.js"
                       ));

			bundles.Add(new StyleBundle("~/Content/admin-plugins").Include(
                        "~/Assets/plugins/bootstrap/css/bootstrap.min.css",
                        "~/Assets/plugins/froala/css/froala_editor.pkgd.min.css",
						"~/Assets/plugins/froala/css/froala_style.min.css",
                        "~/Assets/plugins/jquery-loadingModal/css/jquery.loadingModal.css",
                        "~/Assets/plugins/perfect-scrollbar/perfect-scrollbar.css",
                        "~/Assets/plugins/jquery-confirm/jquery-confirm.min.css"
                      ));

			bundles.Add(new ScriptBundle("~/bundles/admin-layout").Include(
						"~/Assets/js/vmodule.js",
						"~/Assets/js/GLOBAL.js",
                        "~/Assets/Admin/js/vendor.js",
                        "~/Assets/Admin/js/bundle.js",
                        "~/Assets/Admin/js/admin.js"
                       ));

			bundles.Add(new StyleBundle("~/Content/admin-layout").Include(
                      "~/Assets/Admin/css/style.css",
                      "~/Assets/Admin/css/font-awesome.css",
                      "~/Assets/Admin/css/themify-icons.css",
                      "~/Assets/Admin/css/custom.css"
                      ));
            #endregion

            #region Account
            bundles.Add(new ScriptBundle("~/bundles/account").Include(
                        "~/Assets/plugins/jquery/jquery-3.3.1.min.js",
                        "~/Assets/plugins/jquery/ jquery-migrate.min.js",
                        "~/Assets/plugins/jquery-validation/jquery.validate.js",
                        "~/Assets/plugins/jquery-validation/localization/messages_vi.js",
                        "~/Assets/plugins/bootstrap/js/bootstrap.min.js",
                        "~/Assets/plugins/particles/particles.js",
                        "~/Assets/plugins/particles/app.js",
                        "~/Assets/plugins/particles/stats.js",
                        "~/Assets/Account/js/auth.js"
                        ));

            bundles.Add(new StyleBundle("~/Content/account").Include(
                      "~/Assets/plugins/bootstrap/css/bootstrap.min.css",
                      "~/Assets/plugins/font-awesome/font-awesome.css",
                      "~/Assets/Account/css/auth.css"
                      ));
            #endregion
        }
    }
}
