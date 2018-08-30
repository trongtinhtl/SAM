using MongoDB.Driver;
using System.Configuration;

namespace Library.Provider
{
    public class MongoProvider
    {
        private  static string ConnectionString = ConfigurationManager.ConnectionStrings["WACLIMConnectionString"].ConnectionString;
        private static MongoUrl MongoUrl = MongoUrl.Create(ConnectionString);

        public static MongoDatabase Database = new MongoClient(MongoUrl).GetServer().GetDatabase(MongoUrl.DatabaseName);
    }
}
