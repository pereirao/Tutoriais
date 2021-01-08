namespace Polimorfismo
{
    
    class TesteDelegate
    {
        public static void Run()
        {
            double soma = Mat.Soma(new double[] {23.0, 122.5, 41.2, 7.3, 92.2, 11.9}, ShowDet);
        }
        private static void ShowDet(double[] numeros)
        {
            int n = 0;
            System.Console.WriteLine("Parâmetros:");
            foreach (double numero in numeros)
            {
                System.Console.WriteLine($"{++n:D2}..... {numero,9:N4}");
            }
        }

    }

    static class Mat {

        public delegate void Detalhe(double[] numeros);

        public static double Soma(double[] numeros, Detalhe detalhe)
        {
            double soma = 0.0;

            detalhe(numeros);

            foreach (double numero in numeros)
            {
                soma += numero;
            }
            return soma;
        }

    }

}