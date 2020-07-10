import datetime

class Pessoa:

    def __init__(self, nome, nascimento, sexo):
        self.nome = nome
        self.nascimento = nascimento
        self.sexo = sexo

    def idade(self):
        #return datetime.datetime.now() - self.nascimento
        return "Teste"

    def andar(self, passos):
        print("Andei {passos} passos...")
    
    def falar(self, frase):
        print("{nome}: - {frase}")


pessoa1 = Pessoa("Luiz", datetime(1999, 4, 9), "M")

pessoa2 = Pessoa("Alexandre", datetime(1971, 22, 3), "M")

pessoa3 = Pessoa("Cibeli", datetime(1977, 1, 28), "F")


print(pessoa1.idade())
