namespace TradeClassificator.models
{
    public interface ITrade
    {
        double Value { get; }
        string ClientSector { get; }
    }
}