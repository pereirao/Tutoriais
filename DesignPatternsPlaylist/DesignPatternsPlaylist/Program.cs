using DesignPatternsPlaylist;

var beverage = new LatteDecorator( new LatteDecorator( new CaramelDecorator(new Espresso())));

Console.WriteLine($"{beverage.Description()} = {beverage.Cost():N2}");
