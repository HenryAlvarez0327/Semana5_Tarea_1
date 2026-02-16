namespace Api_Web.Models
{
    using Microsoft.EntityFrameworkCore;
    public class WebApiAppContext : DbContext
    {
        public WebApiAppContext(DbContextOptions<WebApiAppContext> options) : base(options)
        {

        }
        public DbSet<ProductoModel> Productos { get; set; }
    }
}
