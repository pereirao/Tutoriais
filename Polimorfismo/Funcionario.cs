using System;

namespace Polimorfismo {
    public class Funcionario : Pessoa {
        private decimal salario;
        public Funcionario(string nome, DateTime nascimento, decimal salario) : base(nome, nascimento)
        {
            this.salario = salario;
        }

        public override void mostraInfo() {
            base.mostraInfo();
            Console.WriteLine($"salario... : {this.salario:C2}");
        }

    }

}