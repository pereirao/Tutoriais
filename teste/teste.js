function numerosOk() {
    var textoUm = document.getElementById("numero-1").value;
    var textoDois = document.getElementById("numero-2").value;

    var ok = false;
    if(parseFloat(textoUm) && parseFloat(textoDois)) {

        ok = {
            n1: parseFloat(textoUm),
            n2: parseFloat(textoDois),
        }

    }
    return ok;

}

function fazerSoma() {
    event.preventDefault();

    var numeros = numerosOk();

    if(numeros) {
        document.getElementById("resultado").innerText = numeros.n1 + numeros.n2;
    }
    else {
        document.getElementById("resultado").innerText = "Valores inválidos!";
    }

}

function fazerSubtracao() {
    event.preventDefault();

    var numeros = numerosOk();

    if(numeros) {
        document.getElementById("resultado").innerText = numeros.n1 - numeros.n2;
    }
    else {
        document.getElementById("resultado").innerText = "Valores inválidos!";
    }

}
