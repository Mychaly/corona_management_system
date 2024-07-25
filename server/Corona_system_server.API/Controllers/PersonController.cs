using AutoMapper;
using Corona_system_server.API.Model;
using Corona_system_server.Core.DTOs;
using Corona_system_server.Core.Entities;
using Corona_system_server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Numerics;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Corona_system_server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
     
        public PersonController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/<PersonController>
        [HttpGet]
        public IEnumerable<PersonGetModel> Get()
        {
            var list= _context.PersonDetails;
            var listDto = _mapper.Map<IEnumerable<PersonGetModel>>(list);
            return listDto;
        }

        // GET api/<PersonController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PersonGetModel>> Get(string id)
        {
            var p =await _context.PersonDetails.FirstOrDefaultAsync(x=>x.Tz.Equals(id));  
            var pDto = _mapper.Map<PersonGetModel>(p);
            if (p == null) 
                return NotFound();  
            return pDto;  
        }

        // POST api/<PersonController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PersonDto p)
        {
            var id= await _context.PersonDetails.FirstOrDefaultAsync(x=>x.Tz == p.Tz);
            var personToAdd= _mapper.Map<Person>(p);
            if(id != null||! Validation.IspersonValid(personToAdd,_context))
                return BadRequest("invalid data");    
            await _context.PersonDetails.AddAsync(personToAdd);
            _context.SaveChanges();
            return Ok();

        }

        // PUT api/<PersonController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] PersonDto p)
        {
            var p1=await _context.PersonDetails.FindAsync(id); ;
            if(p1 == null|| !Validation.IspersonValid(_mapper.Map<Person>(p), _context)) 
                return BadRequest("invalid data");
            p1.FullName = p.FullName;
            p1.Tz = p.Tz;
            p1.DateOfBirth = p.DateOfBirth;
            p1.City = p.City;
            p1.Street = p.Street;
            p1.houseNumber = p.houseNumber;
            p1.Phone = p.Phone;
            p1.MobilePhone = p.MobilePhone;

            await _context.SaveChangesAsync();
            return Ok();
        }

    // DELETE api/<PersonController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var p1 = _context.PersonDetails.Find(id);
            if (p1 == null) return NotFound();
            _context.PersonDetails.Remove(p1);
            await _context.SaveChangesAsync();
            return Ok();    
        }


      [HttpPost("{Tz}/photo")]
        public async Task<IActionResult> UploadPhoto(string Tz, IFormFile photo)
        {
            //   retrieve the member from the database
            var member = await _context.PersonDetails.FirstOrDefaultAsync(x=>x.Tz.Equals(Tz));
            if (member == null)
            {
                return NotFound();
            }

            // save the photo to the database
            using (var stream = new MemoryStream())
            {
                await photo.CopyToAsync(stream);
                member.Photo = stream.ToArray();
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        [HttpGet("{Tz}/photo")]
        public async Task<IActionResult> GetPhoto(string Tz)
        {
            // retrieve the member from the database
            var member = await _context.PersonDetails.FirstOrDefaultAsync(x => x.Tz.Equals(Tz));
            if (member == null || member.Photo == null)
            {
                return NotFound();
            }
            // return the photo data as a response
            return File(member.Photo, "image/jpeg");
        }
    }
}
