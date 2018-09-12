using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System.Configuration;
using System.Web;

namespace WACLIM
{
	/// <summary>
	/// Summary description for FileHandler
	/// </summary>
	public class FileHandler : IHttpHandler
	{

		private static readonly MongoUrl MongoUrl = MongoUrl.Create(ConfigurationManager.ConnectionStrings["WACLIMConnectionString"].ConnectionString);
		public static readonly string ConnectionString =
			ConfigurationManager.ConnectionStrings["WACLIMConnectionString"].ConnectionString.Replace(MongoUrl.DatabaseName, "");
		public static readonly MongoDatabase Database = new MongoClient(ConnectionString).GetServer().GetDatabase(MongoUrl.DatabaseName);

		public void ProcessRequest(HttpContext context)
		{
			try
			{
				context.Response.ContentType = "image/jpg";
				var qs = context.Request.QueryString;
				var id = qs["id"];
				if (string.IsNullOrEmpty(id))
				{
					context.Response.Write("No_id");
				}
				else
				{
					context.Response.ContentType = "image/jpg";

					var oid = new ObjectId(id);
					var file = Database.GridFS.FindOne(Query.EQ("_id", oid));
					using (var stream = file.OpenRead())
					{
						stream.CopyTo(context.Response.OutputStream);
						context.Response.OutputStream.Flush();
					}
				}
			}
			catch (System.Exception)
			{
				throw;
			}
		}

		public bool IsReusable
		{
			get
			{
				return false;
			}
		}
	}
}