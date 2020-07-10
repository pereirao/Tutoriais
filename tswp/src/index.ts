import { formData } from "./form";

const form = document.querySelector("form") as HTMLFormElement;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = formData(form);
    console.log(data);
});

const teste: any = {};
console.log(teste.speak());
