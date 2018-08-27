using System;
using System.Collections.Generic;

namespace WACLIM.Models
{
    /// <summary>
    /// Id: HTML id attribute
    /// Name: HTML name attribute
    /// JsonSettings: Custom for each VModule
    /// </summary>
    /// 
    public class VModuleSettings
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string VModuleId { get; set; }
        public VModuleJsonSettings JsonSettings { get; set; }

        public VModuleSettings()
        {
            JsonSettings = new VModuleJsonSettings();
        }
    }


    public class VModuleJsonSettings
    {
        //AnTung: Dùng để parse JsonSettings (string) truyền từ cshtml lên server thành Object để tiện xử lý. NOTE: Khai báo setting vui lòng note lại của VModule nào, tránh tạo trùng
        #region "Common"
        public bool SaveLocal { get; set; }
        public bool MultiSelect { get; set; }
        public int MaQuyTrinh { get; set; }
        public int XaId { get; set; }
        public int HuyenId { get; set; }
        public int TinhId { get; set; }
        #endregion
		

        #region Module TaiSanChon
        public bool CanAdd { get; set; }
        public bool CanEdit { get; set; }
        public bool CanSearch { get; set; }
        public bool CanDelete { get; set; }
		#endregion

		#region Module ThongTinChiTiet
		public bool IsBindData { get; set; }
        #endregion

        #region Module ListToTrinh
        public long GiayChungNhanId { get; set; }
        #endregion

        //VModule Chủ sử dụng chọn & tài sản chọn
        public string[] LoaiChuSuDung { get; set; }
        public string[] LoaiTaiSan { get; set; }

        public bool LaTaiSanTrenDatThue { get; set; }
        public bool ChoSoVaoSo { get; set; }

        public bool IsCapNhatPhapLyGiayChungNhan { get; set; }

        public VModuleJsonSettings()
        {
            CanAdd = true;
            CanEdit = true;
            CanSearch = true;
            CanDelete = true;
        }
    }
}