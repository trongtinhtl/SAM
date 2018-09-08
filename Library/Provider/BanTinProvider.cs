using Library.Object;
using MongoDB.Bson;
using MongoDB.Driver.Builders;
using System.Linq;

namespace Library.Provider
{
    public class BanTinProvider
    {
        public string Test()
        {
            return "Thành công";
        }

        //
        public bool InsertBanTin(BanTinViewModel objBanTin)
        {
            try
            {
                if (objBanTin == null)
                    return false;

                var urlHinh = new BsonArray();
                objBanTin.UrlHinh.Select(r=> urlHinh.Add(r));
                var doc = new BsonDocument()
                {
                    {"TieuDe", objBanTin.TieuDe},
                    {"TomTat", objBanTin.TomTat},
                    {"UrlHinhDaiDien", objBanTin.UrlHinhDaiDien},
                    {"NoiDung", objBanTin.NoiDung},
                    {"TheLoai", objBanTin.TheLoai},
                    {"TacGia", objBanTin.TacGia},
                    {"NgayXuatBan", objBanTin.NgayXuatBan},
                    {"UrlHinh", new BsonArray(){ urlHinh } }
                };

                //
                var res = MongoProvider.Database.GetCollection("go_bantin").Insert(doc);
                if (res.DocumentsAffected > 0)
                    return true;

                return false;
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }

        //
        public bool DeleteBanTin(string objectId)
        {
            if (string.IsNullOrEmpty(objectId))
                return false;
            return MongoProvider.Database.GetCollection("go_bantin").Remove(Query.EQ("_id", ObjectId.Parse(objectId))).DocumentsAffected > 0;
        }
    }
}
