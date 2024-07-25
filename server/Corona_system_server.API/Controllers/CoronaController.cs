using AutoMapper;
using Corona_system_server.API.Model;
using Corona_system_server.Core.DTOs;
using Corona_system_server.Core.Entities;
using Corona_system_server.Core.Model;
using Corona_system_server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Corona_system_server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoronaController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public CoronaController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        // GET: api/<CoronaController>
        [HttpGet]
        public IEnumerable<CoronaGetModel> Get()
        {
            var list = _context.CoronaDetails;
            var listDto = _mapper.Map<IEnumerable<CoronaGetModel>>(list);
            return listDto;
        }

        // GET api/<CoronaController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CoronaGetModel>> Get(int id)
        {
            var c =await _context.CoronaDetails.FirstOrDefaultAsync(x=>x.PersonId==id);
            var cDto = _mapper.Map<CoronaGetModel>(c);
            if (c == null)
                return NotFound();
            return Ok(cDto);
        }


        // POST api/<CoronaController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CoronaDto c)
        {   
            var p1 =await _context.PersonDetails.FirstOrDefaultAsync(x=>x.Id==c.PersonId);
            if (p1 == null)
                //It is not possible to create patient details for a patient that does not exist
                return BadRequest("Invalid data");
            var c1 =await _context.CoronaDetails.FirstOrDefaultAsync(x => x.PersonId == c.PersonId);
            if (c1 != null) 
                //Illness information already exists for this person and cannot be added
                return BadRequest("Invalid data");
            var coronaToAdd = _mapper.Map<Corona>(c);
            await  _context.CoronaDetails.AddAsync(coronaToAdd);
            await _context.SaveChangesAsync();
            return Ok();

        }

        // PUT api/<CoronaController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] CoronaPutModel c)
        {
            var c1 =await _context.CoronaDetails.FirstOrDefaultAsync(x => x.PersonId == id);          
            if (c1 == null) 
                //There is no such illness details
                return NotFound("no corona details");
            var p1 =await _context.PersonDetails.FirstOrDefaultAsync(x => x.Id == id);
            if (p1 == null)
                //It is not possible to create patient details for a patient that does not exist
                return BadRequest("there is no such patient");
            c1.PositiveResultDate = c.PositiveResultDate;
            c1.RecoveryDate = c.RecoveryDate;
            c1.DateA = c.DateA;
            c1.DateB = c.DateB;
            c1.DateC = c.DateC;
            c1.DateD = c.DateD;
            c1.ManufacturerA = c.ManufacturerA;
            c1.ManufacturerB = c.ManufacturerB;
            c1.ManufacturerC = c.ManufacturerC;
            c1.ManufacturerD = c.ManufacturerD;

            await _context.SaveChangesAsync();
            return Ok();

        }

        // DELETE api/<CoronaController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var c1 =await _context.CoronaDetails.FirstAsync(x => x.PersonId == id);
            if (c1 == null) return NotFound();//לא קיים כזה פרטי מחלה
            _context.CoronaDetails.Remove(c1);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
