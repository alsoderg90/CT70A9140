using Microsoft.EntityFrameworkCore;

namespace back_end.Models
{
    public class PersonContext : DbContext
    {
        public PersonContext(DbContextOptions<PersonContext> options)
            : base(options) { }

        public DbSet<Person> Persons => Set<Person>();
    }
}