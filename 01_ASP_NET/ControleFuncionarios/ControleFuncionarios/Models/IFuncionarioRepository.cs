using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFuncionarios.Models
{
    public interface IFuncionarioRepository
    {
        Funcionario GetFuncionario(int id);
        IEnumerable<Funcionario> GetFuncionarios();
        Funcionario Save(Funcionario funcionario);

    }
}
