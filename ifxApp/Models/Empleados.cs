using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ifxApp.Models;

public partial class Empleados
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Nombre { get; set; } 
    [Required]
    public string Apellido { get; set; }

    public DateTime FechaIngreso { get; set; }
    [Required]
    public string Cargo { get; set; } 

    
    public int EmpresaId { get; set; }
    

    
}
