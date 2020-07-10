import { TemFormat } from "../interfaces/TemFormat";

class ListTemplate {

    constructor(
        private container: HTMLUListElement
    ) { }

    render(item: TemFormat, titulo: string, pos: 'inicio' | 'fim') {
        const li = document.createElement("li");
        const h4 = document.createElement("h4");
        const p = document.createElement("p");

        h4.innerText = titulo;
        p.innerText = item.format();
        li.append(h4);
        li.append(p);

        if (pos === 'inicio') {
            this.container.prepend(li);
        }
        else {
            this.container.append(li);
        }
    }
}

export { ListTemplate }
