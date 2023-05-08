using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesignPatternsPlaylist
{
    public abstract class Beverage
    {
        public abstract double Cost();
        public abstract string Description();
    }

    public abstract class AddOnDecorator : Beverage
    {
        protected Beverage beverage;

        public AddOnDecorator(Beverage beverage)
        {
            this.beverage = beverage;
        }
    }

    public class Espresso : Beverage
    {
        public override double Cost() => 3.5;

        public override string Description() => "Espresso";
    }

    public class Mocha : Beverage
    {
        public override double Cost() => 3.0;

        public override string Description() => "Mocha";
    }

    public class LatteDecorator : AddOnDecorator
    {
        public LatteDecorator(Beverage beverage) : base(beverage) { }

        public override double Cost() => this.beverage.Cost() + 2.0;

        public override string Description() => "Latte " + this.beverage.Description();
    }

    public class CaramelDecorator : AddOnDecorator
    {
        public CaramelDecorator(Beverage beverage) : base(beverage) { }

        public override double Cost() => this.beverage.Cost() + 1.5;

        public override string Description() => "Caramel " + this.beverage.Description();
    }

    public class CreamDecorator : AddOnDecorator
    {
        public CreamDecorator(Beverage beverage) : base(beverage) { }

        public override double Cost() => this.beverage.Cost() + 1.5;

        public override string Description() => "Cream " + this.beverage.Description();
    }

}
