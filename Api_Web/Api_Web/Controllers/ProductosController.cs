using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api_Web.Models;

namespace Api_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly WebApiAppContext _context;

        public ProductosController(WebApiAppContext context)
        {
            _context = context;
        }

        // GET: api/Productos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductoModel>>> GetProductos()
        {
            return await _context.Productos.ToListAsync();
        }

        // GET: api/Productos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductoModel>> GetProductoModel(int id)
        {
            var productoModel = await _context.Productos.FindAsync(id);

            if (productoModel == null)
            {
                return NotFound();
            }

            return productoModel;
        }

        // PUT: api/Productos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductoModel(int id, ProductoModel productoModel)
        {
            if (id != productoModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(productoModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductoModelExists(id))
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

        // POST: api/Productos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductoModel>> PostProductoModel(ProductoModel productoModel)
        {
            _context.Productos.Add(productoModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductoModel", new { id = productoModel.Id }, productoModel);
        }

        // DELETE: api/Productos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductoModel(int id)
        {
            var productoModel = await _context.Productos.FindAsync(id);
            if (productoModel == null)
            {
                return NotFound();
            }

            _context.Productos.Remove(productoModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductoModelExists(int id)
        {
            return _context.Productos.Any(e => e.Id == id);
        }
    }
}
