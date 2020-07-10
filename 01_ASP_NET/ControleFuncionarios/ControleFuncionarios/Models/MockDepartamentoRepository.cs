using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFuncionarios.Models
{
    public class MockDepartamentoRepository : IDepartamentoRepository
    {
        private readonly List<Departamento> _departamentos;

        public MockDepartamentoRepository()
        {
            _departamentos = new List<Departamento>()
            {
                new Departamento() { Id = 1, Nome = "TI"},
                new Departamento() { Id = 2, Nome = "RH"},
                new Departamento() { Id = 3, Nome = "Contabilidade"},
                new Departamento() { Id = 4, Nome = "Tesouraria"},
                new Departamento() { Id = 5, Nome = "Comercial"}
            };
        }

        public Departamento GetDepartamento(int id)
        {
            return _departamentos.FirstOrDefault(d => d.Id == id);
        }

        public List<Departamento> GetDepartamentos()
        {
            return _departamentos;
        }

    }
}
