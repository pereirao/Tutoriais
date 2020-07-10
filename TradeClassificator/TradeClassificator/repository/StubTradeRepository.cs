using System;
using System.Collections.Generic;
using System.Linq;
using TradeClassificator.models;

namespace TradeClassificator.repository
{
    public class StubTradeRepository : IRepository<ITrade>
    {
        public IEnumerable<ITrade> ListAll()
        {
            return new List<ITrade>()
            {
                new Trade(2000000, "Private"),
                new Trade(400000, "Public"),
                new Trade(500000, "Public"),
                new Trade(3000000, "Private"),
                new Trade(30000, "Private"),
            };
        }

    }
}
