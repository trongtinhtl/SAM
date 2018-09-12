
using Library.Provider;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WACLIM.Controllers
{
	public class TestAjaxController : Controller
	{
		// GET: Test
		public ActionResult Index()
		{
			return View();
		}

		[HttpPost]
		public object TestThanhVien()
		{
			try
			{
				var res = new ThanhVienProvider().Test();
				return new
				{
					success = true,
					value = res
				};

			}
			catch (Exception ex)
			{
				return new
				{
					success = false,
					message = ex.Message
				};
			}
		}

		[HttpPost]
		public object TestBanTin()
		{
			try
			{
				var res = new BanTinProvider().Test();
				return new
				{
					success = true,
					value = res
				};

			}
			catch (Exception ex)
			{
				return new
				{
					success = false,
					message = ex.Message
				};
			}
		}
	}
}