using System.Collections.Generic;
using TradeClassificator.models;

namespace TradeClassificator.services
{
    public interface ITradeMatcher<T>
    {
        IEnumerable<T> MatchAll(ITrade trade);
        T MatchOne(ITrade trade);
        T MatchFirst(ITrade trade);
    }
}
