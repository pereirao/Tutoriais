using System;
using System.Collections.Generic;
using System.Text;

namespace TradeClassificator.repository
{
    public interface IRepository<T>
    {
        IEnumerable<T> Read();
        T Read(int id);
        T Create(T item);
        T Update(T item);
        bool Delete(int id);
    }
}
