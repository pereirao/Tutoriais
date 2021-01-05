using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class PessoaRepositoryMock : IPessoaRepository
    {
        private readonly List<Pessoa> _pessoas;
        public PessoaRepositoryMock()
        {
            _pessoas = new List<Pessoa>();
            _pessoas.Add(new Pessoa { Id = 1, Nome = "Alex", Nascimento = new DateTime(2000, 1, 1), Genero = 'M' });
            _pessoas.Add(new Pessoa { Id = 2, Nome = "Bia", Nascimento = new DateTime(1990, 2, 1), Genero = 'F' });
            _pessoas.Add(new Pessoa { Id = 3, Nome = "Carl", Nascimento = new DateTime(1992, 3, 1), Genero = 'M' });
            _pessoas.Add(new Pessoa { Id = 4, Nome = "Daniel", Nascimento = new DateTime(1993, 4, 1), Genero = 'M' });
            _pessoas.Add(new Pessoa { Id = 5, Nome = "Evelyn", Nascimento = new DateTime(1994, 5, 1), Genero = 'F' });
        }

        public bool Delete(int id)
        {
            _pessoas.Remove(_pessoas.FirstOrDefault(p => p.Id == id));
            return true;
        }

        public IEnumerable<Pessoa> Get()
        {
            return _pessoas;
        }

        public Pessoa Get(int id)
        {
            return _pessoas.FirstOrDefault(p => p.Id == id);
        }

        public Pessoa Post(Pessoa pessoa)
        {
            int id = _pessoas.Max(p => p.Id) + 1;
            pessoa.Id = id;
            _pessoas.Add(pessoa);
            return pessoa;
        }

        public Pessoa Put(Pessoa pessoa)
        {
            if (_pessoas.Any(p => p.Id == pessoa.Id))
            {
                _pessoas.Remove(_pessoas.FirstOrDefault(p => p.Id == pessoa.Id));
                _pessoas.Add(pessoa);
            }
            return pessoa;
        }
    }
}
