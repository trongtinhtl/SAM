
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
		public bool Test()
		{
			try
			{
				Dictionary<int, string> dic = new Dictionary<int, string>();

				for (int i = 0; i < 60000; i++)
				{
					if (dic.Count == 0)
					{
						dic.Add(0, "ahdgajh");
					}
					else {
						var next = dic.Keys.Max() + 1;
						dic.Add(next, next.ToString());

					}
				}

				var a = dic[1000];


				return true;
			}
			catch (Exception ex)
			{
				return false;
			}
		}
	}
}