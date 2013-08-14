using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iphonefix.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(string success)
        {
            ViewBag.appointmentredirect = false;
            ViewBag.success = false;
          

            //if the page was loaded after an appointment
            if (!string.IsNullOrEmpty(success))
            {
                //the page should show some dialog for appointment
                ViewBag.appointmentredirect = true;
                
                //success dialog should be shown
                if (success.Equals("true"))
                {
                    ViewBag.error = false;

                }
                //error dialog should be shown
                else
                    ViewBag.error = true;
                
            }

            return View();
        }

        public ActionResult Processapplication(string fname, string lname, string email, string phonenumber, string phonetype)
        {
            string fullname = fname+ " " + lname;
            
            //storing variables in session for confirmation modal
            Session["name"] = fullname;
            Session["email"] = email;
            Session["phonenumber"] = phonenumber;
            Session["phonetype"] = phonetype;

            if (SQLhelper.AddCustomerToDatabase(fullname, email, phonenumber, phonetype))
                return Redirect("/home?success=true");

            else
                return Redirect("/home?success=false");

        }


        public ActionResult Getappointments()
        {
           //get appointments from database

            return new JsonResult()
            {
                Data = "sss"
            };
        }


       
    }
}
