using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelloRazor.Models
{
    public class Pessoa
    {
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public SexoEnum Sexo { get; set; }
    }
}
