using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFuncionarios.Models
{
    public interface IDepartamentoRepository
    {
        List<Departamento> GetDepartamentos();
        Departamento GetDepartamento(int id);
    }
}
