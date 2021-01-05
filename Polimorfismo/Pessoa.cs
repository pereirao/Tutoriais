using System;

namespace Polimorfismo
{
    public class Pessoa
    {
        private string nome;
        private DateTime nascimento;

        public Pessoa(string nome, DateTime nascimento)
        {
            this.nome = nome;
            this.nascimento = nascimento;
        }

        public virtual void mostraInfo() {
            Console.WriteLine($"nome...... : {this.nome}");
            Console.WriteLine($"nascimento : {this.nascimento:yyyy-MM-dd}");
        }
    }
}
