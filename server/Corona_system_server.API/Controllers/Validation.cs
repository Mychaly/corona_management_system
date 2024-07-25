using Corona_system_server.Core.Entities;
using Corona_system_server.Data;
using Microsoft.AspNetCore.Http;

namespace Corona_system_server.API.Controllers
{
    public class Validation
    {
       
        public static bool IspersonValid(Person person, DataContext dbContext)
        {
            if (string.IsNullOrEmpty(person.FullName) ||
               string.IsNullOrWhiteSpace(person.Tz) ||
               string.IsNullOrWhiteSpace(person.Phone))

            {
                return false;
            }

            // Check length of fields
            if (person.Tz.Length != 9 )             
            {
                return false;
            }

            //Ensure that the person's ID and vaccination ID are not negative or zero:
            if (!person.Tz.All(char.IsDigit))
            {
                return false;
            }

            //Check if the date of birth is a valid date and that the person's age is reasonable
            DateTime today = DateTime.Today;
            if (DateTime.ParseExact(person.DateOfBirth, "yyyy-MM-dd", null) > today)
            {
                return false;
            }

           
            // Phone number format:
            if (person.Phone.Length != 9)
            {
                return false;
            }

            if (!person.Phone.All(char.IsDigit))
            {
                return false;
            }


           

            return true;
        }

       

       
}
}
