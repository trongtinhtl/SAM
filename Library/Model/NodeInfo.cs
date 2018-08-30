using System;
using MongoDB.Bson;

namespace Library.Model
{
    public class NodeInfo
    {
        public ObjectId Id { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime UpdatedDate { get; set; }
        public string UserName { get; set; }
        public string TitleDoc { get; set; }
        public string ContentDoc { get; set; }
        public string SummaryDoc { get; set; }
        public string ImageId { get; set; }
    }
}
