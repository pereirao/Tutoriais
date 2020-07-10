namespace TradeClassificator.models
{
    public class LowRiskCategory : ITradeCategory
    {
        public string Name => "LOWRISK";

        public bool Match(ITrade trade)
        {
            return trade.Value < 1_000_000 && trade.ClientSector == "Public";
        }
    }
}
