using System;

namespace Polimorfismo
{
    class Program
    {
        static void Main(string[] args)
        {
            Pessoa p1 = new Pessoa("Adam", new DateTime(2000, 1, 31));
            Pessoa p2 = new Funcionario("Bob", new DateTime(1990, 6, 12), 3600m);

            p1.mostraInfo();
            p2.mostraInfo();

            TesteDelegate.Run();
        }
    }
}
