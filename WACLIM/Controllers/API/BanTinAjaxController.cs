
using Library.Helper;
using Library.Model;
using Library.Provider;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WACLIM.Controllers.API
{
    public class BanTinAjaxController : Controller
    {
		private BanTinProvider _provider = new BanTinProvider();

		[HttpPost]
		public JsonResult  UploadFile() {
			try
			{
				var file = Request.Files != null && Request.Files.Count > 0 ? Request.Files[0].InputStream : null;

				var Id = new FileHelper().SaveFile(file, "adadad");

				return Json(new
				{
					value = Id,
					success =  true
				});
			}
			catch (Exception ex)
			{
				return Json(new
				{
					success = false,
					message = ex.Message
				});
				throw;
			}			
		}

		[HttpPost]
		public JsonResult InsertBanTin(BanTinViewModel vmBanTin) {
			try
			{
				if (vmBanTin != null) {
					var res = _provider.InsertBanTin(vmBanTin);

					if (res != null)
					{
						return Json(new
						{
							success = true,
							value = res,
						});
					}
				};

				return Json(new
				{
					success = true,
					message = "Thêm bản tin không thành công." ,
				});
			}
			catch (Exception ex)
			{
				return Json(new
				{
					success = true,
					message = ex.Message,
				});
			}
		}

		[HttpPost]
		public JsonResult UpdateBanTin(string Id, BanTinViewModel vmBanTin) {
			try
			{
				if (vmBanTin != null &&  vmBanTin.Id != null)
				{
					//var isSuccess = _provider.UpdateBanTin(Id, vmBanTin);

					//if (isSuccess)
					//{
					//	return Json(new
					//	{
					//		success = true,
					//		message = "Cập nhật bản tin thành công.",
					//	});
					//}
				}

				return Json(new
				{
					success = false,
					message = "Cập nhật bản tin không thành công.",
				});
			}
			catch (Exception ex)
			{
				return Json(new
				{
					success = false,
					message = ex.Message,
				});
			}
		}

		[HttpPost]
		public JsonResult DeleteBanTin(string Id) {
			try
			{
				if (!String.IsNullOrEmpty(Id)) {
					var isSuccess = _provider.DeleteBanTin(Id);
					if (isSuccess)
					{
						return Json(new
						{
							success = true,
							value = isSuccess,
						});
					}
				}

				return Json(new
				{
					success = false,
					message = "Xóa bản tin không thành công",
				});
			}
			catch (Exception ex)
			{
				return Json(new
				{
					success = false,
					message = ex.Message,
				});
			}
		}

		[HttpPost]
		public JsonResult GetBanTin(int start, int limit) {
			try
			{
				var res = _provider.GetBanTin(start, limit);
				return Json(new
				{
					success = true,
					value = res
				});
			}
			catch (Exception ex)
			{
				return Json(new
				{
					success = false,
					message = ex.Message
				});
				throw;
			}
		}
    }
}