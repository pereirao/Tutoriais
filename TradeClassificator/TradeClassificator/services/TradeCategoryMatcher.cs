using System;
using System.Collections.Generic;
using System.Linq;
using TradeClassificator.models;

namespace TradeClassificator.services
{
    public class TradeCategoryMatcher : ITradeMatcher<ITradeCategory>
    {
        private readonly IEnumerable<ITradeCategory> _tradeCategories;

        public TradeCategoryMatcher(IEnumerable<ITradeCategory> tradeCategories)
        {
            this._tradeCategories = tradeCategories;
        }

        public IEnumerable<ITradeCategory> MatchAll(ITrade trade)
        {
            return _tradeCategories.Where(t => t.Match(trade));
        }

        public ITradeCategory MatchOne(ITrade trade)
        {
            IEnumerable<ITradeCategory> matches = MatchAll(trade);
            if (matches.Count() != 1)
            {
                throw new Exception($"Incorrect match count: [{matches.Count()}]");
            }
            return matches.First();
        }

        public ITradeCategory MatchFirst(ITrade trade)
        {
            IEnumerable<ITradeCategory> matches = MatchAll(trade);
            if (matches.Count() == 0)
            {
                throw new Exception("No match.");
            }
            return matches.First();
        }

    }
}
