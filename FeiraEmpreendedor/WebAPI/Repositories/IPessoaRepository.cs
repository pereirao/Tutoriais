using System.Collections.Generic;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public interface IPessoaRepository
    {
        IEnumerable<Pessoa> Get();
        Pessoa Get(int id);
        Pessoa Put(Pessoa pessoa);
        Pessoa Post(Pessoa pessoa);
        bool Delete(int id);
    }
}