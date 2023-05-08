using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;

namespace TestesCSharp
{
    public class Trade : IEquatable<Trade>
    {
        public Trade(string name, double value, DateTime endDate)
        {
            this.Name = name;
            this.Value = value;
            this.EndDate = endDate;
        }

        public string Name { get; }
        public double Value { get; }
        public DateTime EndDate { get; }

        public bool Equals([AllowNull] Trade other)
        {
            return this.Name == other.Name && this.Value == other.Value;
        }
    }

    public class EquatableTest
    {
        public void RunTest()
        {
            List<Trade> trades = new List<Trade>();
            Trade tradeA = new Trade("A", 123.45, new DateTime(2023, 1, 1));
            Trade tradeB = new Trade("B", 223.45, new DateTime(2023, 1, 1));
            Trade tradeC = new Trade("C", 123.45, new DateTime(2023, 1, 1));
            Trade tradeD = new Trade("A", 123.45, new DateTime(2023, 1, 1));

            if (!trades.Contains(tradeA))
            {
                trades.Add(tradeA);
            }
            if (!trades.Contains(tradeB))
            {
                trades.Add(tradeB);
            }
            if (!trades.Contains(tradeC))
            {
                trades.Add(tradeC);
            }
            if (!trades.Contains(tradeD))
            {
                trades.Add(tradeD);
            }
            Console.WriteLine(trades.Count);
        }

    }
}
