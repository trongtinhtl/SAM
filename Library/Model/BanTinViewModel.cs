using System;
using System.Collections.Generic;
using System.Text;
using Library.Model;

namespace Library.Object
{
    public class BanTinViewModel : NodeInfo
    {
        public string TieuDe { get; set; }
        public string TomTat { get; set; }
        public string UrlHinhDaiDien { get; set; }
        public string NoiDung { get; set; }
        public int TheLoai { get; set; }
        public string TacGia { get; set; }
        public string NgayXuatBan { get; set; }
        public List<string>UrlHinh{ get; set; }
    }
}
