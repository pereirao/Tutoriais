namespace TradeClassificator.models
{
    public class HighRiskCategory : ITradeCategory
    {
        public string Name => "HIGHRISK";

        public bool Match(ITrade trade)
        {
            return trade.Value > 1_000_000 && trade.ClientSector == "Private";
        }
    }
}
