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

namespace ifxApp.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class EmpresasController : ControllerBase
    {
        private readonly IfxDBContext _context;

        public EmpresasController(IfxDBContext context)
        {
            _context = context;
        }

        // GET: api/Empresas

        [HttpGet]
      
        public async Task<ActionResult<IEnumerable<Empresas>>> GetEmpresa()
        {
          if (_context.Empresa == null)
          {
              return NotFound();
          }
            return await _context.Empresa.ToListAsync();
        }

        // GET: api/Empresas/5
        [HttpGet("{id}")]
       
        public async Task<ActionResult<Empresas>> GetEmpresas(int id)
        {
          if (_context.Empresa == null)
          {
              return NotFound();
          }
            var empresas = await _context.Empresa.FindAsync(id);

            if (empresas == null)
            {
                return NotFound();
            }

            return empresas;
        }

        // PUT: api/Empresas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
       
        public async Task<IActionResult> PutEmpresas(int id, Empresas empresas)
        {
            if (id != empresas.Id)
            {
                return BadRequest();
            }

            _context.Entry(empresas).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmpresasExists(id))
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

        // POST: api/Empresas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
       
        public async Task<ActionResult<Empresas>> PostEmpresas(Empresas empresas)
        {
          if (_context.Empresa == null)
          {
              return Problem("Entity set 'IfxContext.Empresa'  is null.");
          }
            _context.Empresa.Add(empresas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmpresas", new { id = empresas.Id }, empresas);
        }

        // DELETE: api/Empresas/5
        [HttpDelete("{id}")]
      
        public async Task<IActionResult> DeleteEmpresas(int id)
        {
            if (_context.Empresa == null)
            {
                return NotFound();
            }
            var empresas = await _context.Empresa.FindAsync(id);
            if (empresas == null)
            {
                return NotFound();
            }

            _context.Empresa.Remove(empresas);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmpresasExists(int id)
        {
            return (_context.Empresa?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
