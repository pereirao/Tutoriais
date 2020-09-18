using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Command
{
    public class MSSQLDatabaseOperation : IDatabaseOperation
    {
        private IEnumerable<Pessoa> _pessoas = new List<Pessoa>();

        public T Create<T>(T item)
        {
            if (item.GetType() == typeof(Pessoa))
            {
                Pessoa p = item as Pessoa;
                p.Id = _pessoas.Count() + 1;
                this._pessoas.Append(p);
            }

        }

        public T Delete<T>(T item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<T> Read<T>()
        {
            throw new NotImplementedException();
        }

        public T Update<T>(T item)
        {
            throw new NotImplementedException();
        }
    }
}
