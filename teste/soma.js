function numerosOk(p1, p2) {

  var ok = false;
  if(parseFloat(p1) && parseFloat(p2)) {

      ok = {
          n1: parseFloat(p1),
          n2: parseFloat(p2),
      }

  }
  return ok;

}

function fazerSoma(p1, p2) {
  var numeros = numerosOk(p1, p2);

  if(numeros) {
      return numeros.n1 + numeros.n2;
  }
  else {
      return "Valores inválidos!";
  }

}

function fazerSubtracao(p1, p2) {
  var numeros = numerosOk(p1, p2);

  if(numeros) {
    return numeros.n1 - numeros.n2;
  }
  else {
      return "Valores inválidos!";
  }

}


console.log( fazerSubtracao("123", "21") );
