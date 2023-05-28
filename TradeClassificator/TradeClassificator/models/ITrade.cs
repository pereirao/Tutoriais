namespace TradeClassificator.models
{
    public interface ITrade
    {
        double Value { get; }
        ClientSectorEnum ClientSector { get; }
    }

}