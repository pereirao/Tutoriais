using System;

namespace TestesCSharp
{
    public class Pessoa
    {
        public string Nome { get; set; }
        public static int Populacao { get; protected set; }

        public Pessoa(string nome)
        {
            this.Nome = nome;
            Populacao++;
            Console.WriteLine($"Pessoa [{nome}] adicionada. População: {Pessoa.Populacao}");
        }

    }

    class Program
    {
        public static void Main(string[] args)
        {
            Pessoa p1 = new Pessoa("Alexandre");
            Pessoa p2 = new Pessoa("Bernardo");
            Pessoa p3 = new Pessoa("Daniel");

            Console.WriteLine(Pessoa.Populacao);

        }

    }
}
