using System;
using System.Collections.Generic;
using System.Text;

namespace TestesCSharp
{
    public class NegocioSingleton
    {
        private static readonly NegocioSingleton _instance = new NegocioSingleton();

        private readonly IEnumerable<string> _nomes;

        private NegocioSingleton()
        {
            _nomes = new List<string>
            {
                "Alex", "Bob", "Charlie", "David"
            };
        }

        public NegocioSingleton GetInstance()
        {
            return _instance;
        }

    }
}
