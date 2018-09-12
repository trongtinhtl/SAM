using System;
using Library.Provider;
using System.IO;

namespace Library.Helper
{
    public class FileHelper
    {
        public string SaveFile(Stream fs, string nameFile)
        {
            try
            {
                var gridInfos = MongoProvider.Database.GridFS.Upload(fs, nameFile);
                if (gridInfos == null)
                    return null;
                return gridInfos.Id.ToString();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
    }
}
