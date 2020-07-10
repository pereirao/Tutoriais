const url = "https://jsonplaceholder.typicode.com/users/2";

let request = new XMLHttpRequest();

const response = document.querySelector("#txt-response");
const botao = document.querySelector("#btn-req");

function mudouEstado() {
    console.log("Mudou", request.readyState, request.status, request.statusText);
    if (request.readyState === request.DONE) {
        if (request.status === 200) {
            response.value = request.responseText;
        }
        else {
            console.log("Deu ruim", request.statusText)
        }
        botao.removeAttribute("disabled");
    }
}

request.onreadystatechange = mudouEstado;

botao.addEventListener("click", () => {
    response.value = "";
    botao.setAttribute("disabled", "disabled");
    request.open("GET", url);
    request.send(null);
});
