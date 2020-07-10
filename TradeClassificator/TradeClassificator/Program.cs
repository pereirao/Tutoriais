using System;
using System.Collections.Generic;
using System.Threading;
using TradeClassificator.models;
using TradeClassificator.repository;
using TradeClassificator.services;

namespace TradeClassificator
{
    class Program
    {
        static void Main(string[] args)
        {
            List<ITradeCategory> categories = new List<ITradeCategory>()
            {
                new HighRiskCategory(),
                new MediumRiskCategory(),
                new LowRiskCategory()
            };

            TradeCategoryMatcher matcher = new TradeCategoryMatcher(categories);

            IRepository<ITrade> repository = new StubTradeRepository();
            IEnumerable<ITrade> portfolio = repository.ListAll();

            List<string> output = new List<string>();
            foreach (ITrade trade in portfolio)
            {
                try
                {
                    output.Add(matcher.MatchOne(trade).Name);
                }
                catch(Exception e)
                {
                    Console.WriteLine($"Error trying to match category for trade [Value: {trade.Value:C2}, ClientSector: {trade.ClientSector}, Error: {e.Message}]");
                    output.Add("**ERROR**");
                }
            }

            Console.WriteLine("{ " + string.Join(", ", output) + " }");
        }
    }
}
