using System;
using System.Collections.Generic;
using System.Text;
using Library.Model;

namespace Library.Object
{
    public class BanTinViewModel : NodeInfo
    {
        public string tieuDe { get; set; }
        public string tomTat { get; set; }
        public string urlHinh { get; set; }
        public string noiDung { get; set; }
        public int theLoai { get; set; }
        public string tacGia { get; set; }
        public string ngayXuatBan { get; set; }
        public List<string> duongDanAnh { get; set; }
    }
}
