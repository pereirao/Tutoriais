namespace TradeClassificator.models
{
    public class Trade : ITrade
    {
        public Trade(double value, ClientSectorEnum clientSector)
        {
            this.ClientSector = clientSector;
            this.Value = value;
        }

        public double Value { get; }
        public ClientSectorEnum ClientSector { get; }
    }
}
