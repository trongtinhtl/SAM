using MongoDB.Bson.Serialization.Attributes;

namespace Library.Model
{
    [BsonIgnoreExtraElements]
    public class ThanhVienViewModel : NodeInfo
    {
		public string Name { get; set; }
		public string Degree { get; set; }
		public string Email { get; set; }
		public string Phone { get; set; }
		public string DonViCongTac { get; set; }
    }
}
