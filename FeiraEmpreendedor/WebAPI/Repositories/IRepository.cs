using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Repositories
{
    public interface IRepository<T>
    {
        IEnumerable<T> Get();
        T Get(int id);
        T Get(string text);
        T Put(T pessoa);
        T Post(T pessoa);
        bool Delete(int id);
    }
}
