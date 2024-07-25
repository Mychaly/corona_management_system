using AutoMapper;
using Corona_system_server.API.Model;
using Corona_system_server.Core.DTOs;
using Corona_system_server.Core.Entities;
using Corona_system_server.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corona_system_server.Core
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<PersonDto, Person>().ReverseMap();
            CreateMap<CoronaDto,Corona>().ReverseMap();
            CreateMap<PersonGetModel, Person>().ReverseMap();
            CreateMap<CoronaGetModel, Corona>().ReverseMap();
            CreateMap<CoronaPutModel, Corona>().ReverseMap();
        }
    }
}
