using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

namespace HelloRazor.Models
{
    public class Usuario : Pessoa
    {
        public string Login { get; set; }
        public string Senha { get; set; }
    }
        
    public class Telefone
    {
        public TipoTelefoneEnum Tipo { get; set; }
        public string Numero { get; set; }
    }
}
