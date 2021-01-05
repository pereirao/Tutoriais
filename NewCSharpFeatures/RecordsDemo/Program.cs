using System;

namespace RecordsDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            PessoaRecord pr1 = new PessoaRecord("Alexandre", "Pereira");
            PessoaRecord pr2 = new PessoaRecord("Alexandre", "Pereira");
            PessoaRecord pr3 = new PessoaRecord("Luiz Carlos", "Zinevicius Pereira");
            PessoaRecord pr4 = pr1;
            PessoaClass pc1 = new PessoaClass("Alexandre", "Pereira");
            PessoaClass pc2 = new PessoaClass("Alexandre", "Pereira");
            PessoaClass pc3 = new PessoaClass("Luiz Carlos", "Zinevicius Pereira");
            PessoaClass pc4 = pc1;
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("Records:");
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine($"ToString: {pr1}");
            Console.WriteLine($"Equals: {Equals(pr1, pr2)}");
            Console.WriteLine($"==: {pr1 == pr2}");
            Console.WriteLine($"ReferenceEquals: {ReferenceEquals(pr1, pr4)}");
            Console.ForegroundColor = ConsoleColor.DarkRed;
            Console.WriteLine("\n=================================================================\n");
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("Classes:");
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine($"ToString: {pc1}");
            Console.WriteLine($"Equal: {Equals(pc1, pc2)}");
            Console.WriteLine($"==: {pc1 == pc2}");
            Console.WriteLine($"ReferenceEquals: {ReferenceEquals(pc1, pc4)}");

        }
    }

    public record PessoaRecord(string Nome, string Sobrenome);

    public class PessoaClass
    {
        public PessoaClass(string nome, string sobrenome)
        {
            Nome = nome;
            Sobrenome = sobrenome;
        }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
    }
}
