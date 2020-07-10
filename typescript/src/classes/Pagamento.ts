import { TemFormat } from '../interfaces/TemFormat.js';

class Pagamento implements TemFormat {

    private moeda = "R$";

    constructor(
        private cliente: string,
        private detalhes: string,
        private valor: number,
    ) { }

    format() {
        return `${this.cliente} deve ${this.moeda}${this.valor} por ${this.detalhes}.`;
    }
}

export { Pagamento }
