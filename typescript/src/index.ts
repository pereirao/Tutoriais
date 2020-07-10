"use strict"

import { Fatura } from './classes/Fatura';
import { Pagamento } from './classes/Pagamento';
import { TemFormat } from './interfaces/TemFormat';
import { ListTemplate } from './classes/ListTemplate';

const form = document.querySelector(".novo-item-form") as HTMLFormElement;
const tipo = document.querySelector("#tipo") as HTMLSelectElement;
const dePara = document.querySelector("#dePara") as HTMLInputElement;
const detalhes = document.querySelector("#detalhes") as HTMLInputElement;
const valor = document.querySelector("#valor") as HTMLInputElement;
const ul = document.querySelector(".item-list") as HTMLUListElement;

const listTemplate = new ListTemplate(ul);

form.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    let doc: TemFormat;

    if (tipo.value === 'fatura') {
        doc = new Fatura(dePara.value, detalhes.value, valor.valueAsNumber);
    }
    else {
        doc = new Pagamento(dePara.value, detalhes.value, valor.valueAsNumber);
    }
    listTemplate.render(doc, tipo.value, "fim");
});
