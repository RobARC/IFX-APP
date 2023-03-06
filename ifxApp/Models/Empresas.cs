using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ifxApp.Models;

public partial class Empresas
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Nombre { get; set; } = null!;

    public string Ciudad { get; set; } = null!;

    public int codigoPostal { get; set; }

}
