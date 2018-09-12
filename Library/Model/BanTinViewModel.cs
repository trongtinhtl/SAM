using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Library.Model
{
    [BsonIgnoreExtraElements]
    public class BanTinViewModel : NodeInfo
    {
        public string Title { get; set; }
        public string Summary { get; set; }
        public string UrlHinhDaiDien { get; set; }
        public string Content { get; set; }
        public int TypeDoc { get; set; }
        public string Author { get; set; }
        public string PublishDate { get; set; }
        public List<string>UrlHinh{ get; set; }
        public string EContent { get; set; }
        public string ETitle { get; set; }
        public string ESummary { get; set; }
    }
}
