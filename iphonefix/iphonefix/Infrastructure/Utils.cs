using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace iphonefix.Infrastructure
{
    public class Utils
    {
        public static string GetSiteRoot()
        {
            return HttpContext.Current.Request.Url.Scheme
                + "://"
                + HttpContext.Current.Request.Url.Authority
                + HttpContext.Current.Request.ApplicationPath;
        }
    }
}