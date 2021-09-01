using System;
using System.Collections.Generic;

namespace YieldDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            IEnumerable<int> numeros = GeraNumeros(5);
            Console.WriteLine("Begin loop");
            foreach (int numero in numeros)
            {
                Console.WriteLine($"Generated number: {numero}");
            }
        }

        private static IEnumerable<int> GeraNumeros(int qty)
        {
            Console.WriteLine("Function entry");
            Random random = new Random();
            for (int i = 0; i < qty; i++)
            {
                Console.WriteLine($"Iteration: {i}");
                yield return random.Next(0, 1000);
            }
        }
    }

    public class Pessoa
    {
        public string Nome { get; set; }
        public DateTime Nascimento { get; set; }
        public Pessoa(string nome, DateTime nascimento)
        {
            Console.WriteLine($"Contrucator: {nome}");
            Nome = nome;
            Nascimento = nascimento;
        }
    }

}
