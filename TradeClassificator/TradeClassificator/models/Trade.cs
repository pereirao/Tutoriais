namespace TradeClassificator.models
{
    public class Trade : ITrade
    {
        public Trade(double value, string clientSector)
        {
            this.ClientSector = clientSector;
            this.Value = value;
        }

        public double Value { get; }
        public string ClientSector { get; }
    }
}
