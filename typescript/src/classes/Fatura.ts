import { TemFormat } from '../interfaces/TemFormat.js';

class Fatura implements TemFormat {

    constructor(
        private cedente: string,
        private detalhes: string,
        private valor: number,
    ) { }

    format() {
        return `${this.cedente} recebe R$${this.valor} de ${this.detalhes}.`;
    }
}

export { Fatura }
