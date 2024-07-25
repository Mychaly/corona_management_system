using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corona_system_server.Core.DTOs
{
    public class PersonDto
    {
    //    public int Id { get; set; }
        public string FullName { get; set; }
        public string Tz { get; set; }
        public string DateOfBirth { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public int houseNumber { get; set; }
        public string Phone { get; set; }
        public string MobilePhone { get; set; }
     //   public byte[]? Photo { get; set; }
    }
}
