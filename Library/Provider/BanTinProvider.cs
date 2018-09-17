using System;
using MongoDB.Bson;
using MongoDB.Driver.Builders;
using Library.Model;
using System.Collections.Generic;

namespace Library.Provider
{
    public class BanTinProvider
    {
        public string Test()
        {
            return "Thành công";
        }

        // Get bản tin gần nhất
        // num = 0: Get All
        public IEnumerable<BanTinViewModel> GetBanTin(int start = 0, int limit = 0)
        {
            try
            {
                return MongoProvider.Database.GetCollection<BanTinViewModel>("go_bantin").FindAll().SetSortOrder(SortBy.Descending("CreatedDate")).SetSkip(start).SetLimit(limit);
            }
            catch (Exception)
            {
                return null;
            }
        }

        //
        public string InsertBanTin(BanTinViewModel banTin)
        {
            try
            {
				if (banTin == null)
					return null;
				banTin.Id = ObjectId.GenerateNewId();
				banTin.CreatedDate = DateTime.Now;
				banTin.UpdatedDate = DateTime.Now;
				MongoProvider.Database.GetCollection<BanTinViewModel>("go_bantin").Insert(banTin);
				return banTin.Id.ToString();
			}
            catch (Exception)
            {
                return null;
            }
        }

        //
        public bool DeleteBanTin(string objectId)
        {
            try
            {
                if (string.IsNullOrEmpty(objectId))
                    return false;

                return MongoProvider.Database.GetCollection("go_bantin").Remove(Query.EQ("_id", ObjectId.Parse(objectId))).DocumentsAffected > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }
		
   //     public bool UpdateBanTin(string objectId, BanTinViewModel banTin)
   //     {
   //         try
   //         {
   //             if (string.IsNullOrEmpty(objectId))
   //                 return false;

			//	banTin.UpdatedDate = DateTime.Now;

			//	var result = MongoProvider.Database.GetCollection("go_bantin").Update(
			//			Query.EQ("_id", ObjectId.Parse(objectId)),
			//			Update.Set("Title", banTin.Title).Set("Summary", banTin.Summary).Set("URL", Address),
			//			MongoDB.Driver.UpdateFlags.Upsert
			//   );



			//	//            if (MongoProvider.Database.GetCollection("go_bantin").Remove(Query.EQ("_id", ObjectId.Parse(objectId))).DocumentsAffected < 0)
			//	//                return false;

			//	//banTin.Id = ObjectId.Parse(objectId);
			//	//            return MongoProvider.Database.GetCollection<BanTinViewModel>("go_bantin").Insert(banTin) !=  null ? true: false;

			//}
   //         catch (Exception)
   //         {
   //             return false;
   //         }
   //     }
    }
}
