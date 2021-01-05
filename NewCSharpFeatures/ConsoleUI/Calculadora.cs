using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleUI
{
    class Calculadora
    {
        public static void Main(string[] args)
        {
            Financiamento financiamento = new Financiamento();

            double parcela = financiamento.CalculaParcelas(1234.56, 0.0, 1.5, 24);

            Console.WriteLine($"Valor da parcela: {parcela:C2}");
        }
    }
}
