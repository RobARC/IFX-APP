using System;
using System.Collections.Generic;
using ifxApp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ifxApp.Context;

public partial class IfxDBContext : IdentityDbContext<ApplicationUser>
{
    public IfxDBContext()
    {
    }

    public IfxDBContext(DbContextOptions<IfxDBContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Empresas> Empresa { get; set; }

    public virtual DbSet<Empleados> Empleado { get; set; }

    public DbSet<ApplicationUser> ApplicationUsers { get; set; }
    public DbSet<ApplicationRole> ApplicationRoles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.seed();
        base.OnModelCreating(modelBuilder);
    }

}
