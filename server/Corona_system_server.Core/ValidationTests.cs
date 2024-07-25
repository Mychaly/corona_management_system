using Corona_system_server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corona_system_server.Core
{
    public class ValidationTests
    {
            //public static bool IspersonInputValid(Person person,DataContext dbContext)
            //{
            //    // Check required fields
            //    if (string.IsNullOrWhiteSpace(person.FullName) ||
            //        string.IsNullOrWhiteSpace(person.Tz) ||
            //        string.IsNullOrWhiteSpace(person.City) ||
            //        string.IsNullOrWhiteSpace(person.DateOfBirth) ||
            //        string.IsNullOrWhiteSpace(person.Street) ||
            //        string.IsNullOrWhiteSpace(person.houseNumber.ToString()) ||
            //        string.IsNullOrWhiteSpace(person.Phone) ||
            //        string.IsNullOrWhiteSpace(person.MobilePhone))
            //    {
            //        return false;
            //    }

            //    // Check length of fields
            //    if (
            //        person.Tz.ToString().Length != 9 ||
            //         person.Phone.Length > 20 ||
            //        person.MobilePhone.Length > 20)
            //    {
            //        return false;
            //    }



            //    //Check if the date of birth is a valid date and that the person's age is reasonable
            //    DateTime today = DateTime.Today;
            //    if (person.DateOfBirth > today)
            //    {
            //        return false;
            //    }

            //    // Check if dates are valid
            //    if (person.PositiveResultDate > person.RecoveryDate)
            //    {
            //        return false;
            //    }

            //    //Check if the person's phone and mobile phone numbers are unique in the database:
            //    var existingperson = dbContext.persons.FirstOrDefault(p => p.Phone == person.Phone || p.MobilePhone == person.MobilePhone);
            //    if (existingperson != null)
            //    {
            //        return false;
            //    }

            //    // Phone number format:
            //    if (person.Phone.Length != 9)
            //    {
            //        return false;
            //    }
            //    if (person.Phone[0] != '0')
            //    {
            //        return false;
            //    }
            //    if (!person.Phone.All(char.IsDigit))
            //    {
            //        return false;
            //    }


            //    // Mobile number format:
            //    if (person.MobilePhone.Length != 10)
            //    {
            //        return false;
            //    }
            //    if (person.MobilePhone[0] != '0')
            //    {
            //        return false;
            //    }
            //    if (!person.MobilePhone.All(char.IsDigit))
            //    {
            //        return false;
            //    }

            //    //Validate the format of the person's address fields:
            //    const string VALID_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-# ";
            //    if (!person.City.All(c => VALID_CHARS.Contains(c)) ||
            //        !person.Street.All(c => VALID_CHARS.Contains(c)))
            //    {
            //        return false;
            //    }

            //    // Check if ID is unique
            //    existingperson = dbContext.persons.FirstOrDefault(p => p.personId == person.personId);
            //    if (existingperson != null)
            //    {
            //        return false;
            //    }

            //    return true;
            //}

            //public static bool IsVaccineInputValid(Vaccination vaccine, HmoDbContext dbContext)
            //{
            //    // Check required fields
            //    if (string.IsNullOrWhiteSpace(vaccine.Vname) ||
            //        string.IsNullOrWhiteSpace(vaccine.Manufacturer))
            //    {
            //        return false;
            //    }

            //    // Check if ID is unique

            //    var existingperson = dbContext.Vaccinations.FirstOrDefault(v => v.VaccinationId == vaccine.VaccinationId);
            //    if (existingperson != null)
            //    {
            //        return false;
            //    }

            //    return true;
            //}

            //public static bool IspersonVaccinationInputValid(InputPV inputPV, HmoDbContext dbContext)
            //{
            //    // Check if person exists
            //    if (!dbContext.persons.Any(p => p.personId == inputPV.personId))
            //    {
            //        return false;
            //    }

            //    // Check if vaccine exists
            //    if (!dbContext.Vaccinations.Any(v => v.VaccinationId == inputPV.VaccinationId))
            //    {
            //        return false;
            //    }

            //    // Check if person has received 4 or more vaccinations
            //    if (dbContext.personVaccinations.Count(pv => pv.personId == inputPV.personId) >= 4)
            //    {
            //        return false;
            //    }

            //    return true;
            //}
        }
    


}
