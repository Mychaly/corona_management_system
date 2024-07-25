using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corona_system_server.Core.Entities
{
    public class Corona
    {
        public int id { get; set; }
        public string PositiveResultDate { get; set; }
        public string RecoveryDate { get; set; }
        public string DateA { get; set; }
        public string DateB { get; set; }
        public string DateC { get; set; }
        public string DateD { get; set; }
        public string ManufacturerA { get; set; }
        public string ManufacturerB { get; set; }
        public string ManufacturerC { get; set; }
        public string ManufacturerD { get; set; }
        public int PersonId { get; set; }
        public Person Person { get; set; }
        //להוסיף כאן קישרי גומלין
    }
}
