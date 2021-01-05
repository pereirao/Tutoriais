class Arvore {

    constructor() {
        this.nos = {};
    }

    inserir(arvore, valor) {
        if (arvore.valor) {
            if (valor > arvore.valor) {
                this.inserir(arvore.direita, valor)
            }
            else {
                this.inserir(arvore.esquerda, valor)
            }
        } else {
            arvore.valor = valor;
            arvore.direita = {};
            arvore.esquerda = {};
        }
    }
}

const arvore = new Arvore();
arvore.inserir(arvore.nos, 23);
arvore.inserir(arvore.nos, 12);
arvore.inserir(arvore.nos, 4);
arvore.inserir(arvore.nos, 40);
arvore.inserir(arvore.nos, 30);

console.log(arvore);