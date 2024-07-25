namespace Corona_system_server.API.Model
{
    public class PersonGetModel
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Tz { get; set; }
        public string DateOfBirth { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public int houseNumber { get; set; }
        public string Phone { get; set; }
        public string MobilePhone { get; set; }
      //  public byte[]? Photo { get; set; }
    }
}
