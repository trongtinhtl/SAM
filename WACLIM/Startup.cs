using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WACLIM.Startup))]
namespace WACLIM
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
