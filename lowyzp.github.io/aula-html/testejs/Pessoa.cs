using System;

namespace testejs

public class Pessoa {

    public string Nome;

    public DateTime DataNascimento;

    public SexoEnum Sexo;

    private int Idade;
 
    public void Andar(int passos) {
        Console.WriteLine($"Andei {passos} passos...");
    }

    public void Falar(string frase) {
        Console.WriteLine($"Falei {frase} passos...");
    }

}

public enum SexoEnum {
    Masculino,
    Feminino
}