using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFuncionarios.Models
{

    public class MockFuncionarioRepository : IFuncionarioRepository
    {
        private readonly List<Funcionario> _funcionarios;
        private readonly IDepartamentoRepository _departamentoRepository;

        public MockFuncionarioRepository()
        {
            _departamentoRepository = new MockDepartamentoRepository();
            _funcionarios = new List<Funcionario>()
            {
                new Funcionario() { Id = 1, Nome = "Alexandre Alves", Email = "alexandre@hotmail.com", Departamento =  _departamentoRepository.GetDepartamento(2) },
                new Funcionario() { Id = 2, Nome = "Bernardo Bismarck", Email = "bernardo@hotmail.com", Departamento = _departamentoRepository.GetDepartamento(1) },
                new Funcionario() { Id = 3, Nome = "Carlos Cardoso", Email = "carlos@hotmail.com", Departamento = _departamentoRepository.GetDepartamento(1) },
                new Funcionario() { Id = 4, Nome = "Daniel Diniz", Email = "daniel@hotmail.com", Departamento = _departamentoRepository.GetDepartamento(2) },
            };
        }

        public Funcionario GetFuncionario(int id)
        {
            return _funcionarios.FirstOrDefault(f => f.Id == id);
        }

        public IEnumerable<Funcionario> GetFuncionarios()
        {
            return _funcionarios;
        }

        public Funcionario Save(Funcionario funcionario)
        {
            int id = _funcionarios.Max(f => f.Id) + 1;
            Departamento departamento = _departamentoRepository.GetDepartamento(funcionario.Departamento.Id);
            funcionario.Id = id;
            funcionario.Departamento = departamento;
            _funcionarios.Add(funcionario);
            return funcionario;
        }
    }
}

