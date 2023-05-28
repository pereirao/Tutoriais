namespace TradeClassificator.models
{
    public class MediumRiskCategory : ITradeCategory
    {
        public string Name => "MEDIUMRISK";

        public bool Match(ITrade trade)
        {
            return trade.Value > 1_000_000 && trade.ClientSector == ClientSectorEnum.Public;
        }
    }
}
