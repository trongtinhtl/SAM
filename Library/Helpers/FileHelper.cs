using System;
using Library.Provider;

namespace Library.Helper
{
    internal class FileHelper
    {
        public string SaveFile()
        {
            try
            {
                var gridInfos = MongoProvider.Database.GridFS.Upload(fs, path);
                if (gridInfos == null)
                    return null;
                return gridInfos;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
    }
}
