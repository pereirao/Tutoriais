using System;
using System.Collections.Generic;
using System.Text;

namespace TradeClassificator.repository
{
    public interface IRepository<T>
    {
        IEnumerable<T> ListAll();
    }
}
