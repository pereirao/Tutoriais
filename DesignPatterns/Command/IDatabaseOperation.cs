using System;
using System.Collections.Generic;
using System.Text;

namespace Command
{
    interface IDatabaseOperation
    {
        public T Create<T>(T item);
        public IEnumerable<T> Read<T>();
        public T Update<T>(T item);
        public T Delete<T>(T item);
    }
}
