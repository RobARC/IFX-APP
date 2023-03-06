using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ifxApp.Context;
using ifxApp.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace ifxApp.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
   
    [Route("api/[controller]")]
    [ApiController]
   
    public class EmpleadosController : ControllerBase
    {
       
        private readonly IfxDBContext _context;

        public EmpleadosController(IfxDBContext context)
        {
            _context = context;
        }

        // GET: api/Empleados
        
        [HttpGet]
     
        public async Task<ActionResult<IEnumerable<Empleados>>> GetEmpleado()
        {
          if (_context.Empleado == null)
          {
              return NotFound();
          }
         
          return await _context.Empleado.ToListAsync();
        }

        // GET: api/Empleados/5
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Empleados>> GetEmpleados(int id)
        {
          if (_context.Empleado == null)
          {
              return NotFound();
          }
            var empleados = await _context.Empleado.FindAsync(id);

            if (empleados == null)
            {
                return NotFound();
            }

            return empleados;
        }

        // PUT: api/Empleados/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
      
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmpleados(int id, Empleados empleados)
        {
            if (id != empleados.Id)
            {
                return BadRequest();
            }

            _context.Entry(empleados).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmpleadosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Empleados
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
       
        [HttpPost]
        public async Task<ActionResult<Empleados>> PostEmpleados(Empleados empleados)
        {
          if (_context.Empleado == null)
          {
              return Problem("Entity set 'IfxContext.Empleado'  is null.");
          }
            _context.Empleado.Add(empleados);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmpleados", new { id = empleados.Id }, empleados);
        }

        // DELETE: api/Empleados/5
     
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmpleados(int id)
        {
            if (_context.Empleado == null)
            {
                return NotFound();
            }
            var empleados = await _context.Empleado.FindAsync(id);
            if (empleados == null)
            {
                return NotFound();
            }

            _context.Empleado.Remove(empleados);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmpleadosExists(int id)
        {
            return (_context.Empleado?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
