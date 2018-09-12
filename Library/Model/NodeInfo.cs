using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Library.Model
{
    [BsonIgnoreExtraElements]
    public class NodeInfo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
