﻿using System;
using System.Collections.Generic;
using System.Linq;
using TradeClassificator.models;

namespace TradeClassificator.repository
{
    public class StubTradeRepository : IRepository<ITrade>
    {
        public ITrade Create(ITrade item)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ITrade> Read()
        {
            return new List<ITrade>()
            {
                new Trade(2000000, ClientSectorEnum.Private),
                new Trade(400000, ClientSectorEnum.Public),
                new Trade(500000, ClientSectorEnum.Public),
                new Trade(3000000, ClientSectorEnum.Private),
                new Trade(30000, ClientSectorEnum.Private),
            };
        }

        public ITrade Read(int id)
        {
            throw new NotImplementedException();
        }

        public ITrade Update(ITrade item)
        {
            throw new NotImplementedException();
        }
    }
}
