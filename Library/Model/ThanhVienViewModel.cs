using System;
using System.Collections.Generic;
using System.Text;
using Library.Model;

namespace Library.Object
{
    public class ThanhVienViewModel : NodeInfo
    {
		public string HoTen { get; set; }
		public string hocVi { get; set; }
		public string email { get; set; }
		public string soDienThoai { get; set; }
		public string donViCongTac { get; set; }
    }
}
