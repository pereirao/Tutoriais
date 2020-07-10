namespace TradeClassificator.models
{
    public interface ITradeCategory
    {
        public string Name { get; }
        public bool Match(ITrade trade);
    }
}
