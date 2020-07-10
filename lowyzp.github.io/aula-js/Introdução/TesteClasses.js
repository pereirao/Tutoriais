class Pessoa {

    _totalPassos = 0;
    _falas = [];

    constructor(nome, nascimento, sexo) {
        this._nome = nome
        this._nascimento = nascimento;
        this._sexo = sexo;
    }

    Falar(fala) {
        console.log(this._nome + ": - " + fala);
        this._falas.push(fala);
    }

    Andar(passos) {
        console.log("Andei " + passos + " passos");
        this._totalPassos += passos;
    }

};

class Populacao {

    _pessoas = [];

    AdicionarPessoa(pessoa) {
        this._pessoas.push(pessoa);
    }

    QuantosHomens() {
        return this._pessoas.reduce((q, p) => q += p._sexo === "M" ? 1 : 0);
    }
}

let pessoa1 = new Pessoa("Luiz", new Date("1999-03-09"), "M");
let pessoa2 = new Pessoa("Marco", new Date("2009-30-01"), "M");
let pessoa3 = new Pessoa("Cibeli", new Date("1977-00-28"), "F");

let populacao = new Populacao();

populacao.AdicionarPessoa(pessoa1);
populacao.AdicionarPessoa(pessoa2);
populacao.AdicionarPessoa(pessoa3);

console.log(populacao.QuantosHomens());