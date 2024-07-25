using Corona_system_server.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corona_system_server.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Corona> CoronaDetails { get; set; }

        public DbSet<Person> PersonDetails { get; set; }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=corona_db");
        }

    }
}
