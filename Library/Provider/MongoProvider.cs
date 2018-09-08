using Library.Model;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;

namespace Library.Provider
{
    public class MongoProvider
    {
        private  static string ConnectionString = ConfigurationManager.ConnectionStrings["WACLIMConnectionString"].ConnectionString;
        private static MongoUrl MongoUrl = MongoUrl.Create(ConnectionString);

        public static MongoDatabase Database = new MongoClient(MongoUrl).GetServer().GetDatabase(MongoUrl.DatabaseName);

        // getNode : sort by date
        public List<NodeInfo> GetNode(string nodeId, int numRow)
        {
            try
            {
                if (string.IsNullOrEmpty(nodeId))
                    return null;
                return Database.GetCollection<NodeInfo>("go_node").FindAll().SetSortOrder(SortBy.Descending("DateTime")).SetLimit(numRow).ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
