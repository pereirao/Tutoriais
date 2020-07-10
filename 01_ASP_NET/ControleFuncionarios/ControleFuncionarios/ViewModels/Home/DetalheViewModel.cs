using ControleFuncionarios.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFuncionarios.ViewModels.Home
{
    public class DetalheViewModel
    {
        public string Titulo { get; set; }
        public Funcionario Funcionario { get; set; }
    }
}
