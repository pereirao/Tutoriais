// para executar no terminal, execute
// o comando node ./teste.js

const arrayEntrada = [
    2, 7, 21, 10, 1, 9, 6, 11, 16, 12, 14, 3
];

console.log("Original", arrayEntrada);

// ---------------------------------------------------
// Funções
// ---------------------------------------------------

const aoQuadrado = n => n ** 2;

const ehPar = n => n % 2 === 0;

const soma = (s, n) => s + n;

const somaPar = (s, n) => s + (n % 2 === 0 ? n : 0);

const somaImpar = (s, n) => s + (n % 2 !== 0 ? n : 0);

const somaMaiores = (s, n, i, m) => {

    let r = 0;
    if (i === 0) {
        r = n;
    }
    else {
        r = (n > m[i - 1]) ? s + n : s;
    }
    return r;

};

// ---------------------------------------------------
// Eleva os elementos ao quadrado
// ---------------------------------------------------
const arrayMap = arrayEntrada.map(aoQuadrado);
console.log("Quadrado - Map", arrayMap);


// ---------------------------------------------------
// Filtra os elementos pares
// ---------------------------------------------------
const arrayFilter = arrayEntrada.filter(ehPar);
console.log("Pares - Filter", arrayFilter);


// ---------------------------------------------------
// Soma os elementos
// ---------------------------------------------------
const arrayReduce = arrayEntrada.reduce(soma);
console.log("Soma - Reduce", arrayReduce);


// ---------------------------------------------------
// Soma os elementos pares
// ---------------------------------------------------
const arrayReduce2 = arrayEntrada.reduce(somaPar);
console.log("Soma pares - Reduce", arrayReduce2);

// ---------------------------------------------------
// Soma os elementos maiores que o anterior
// ---------------------------------------------------
const arrayReduce3 = arrayEntrada.reduce(somaMaiores);
console.log("Soma maiores - Reduce", arrayReduce3);

// ---------------------------------------------------
// Algum par ?
// ---------------------------------------------------
console.log("Algum par? - Any", arrayEntrada.some(ehPar));

// ---------------------------------------------------
// Todos pares ?
// ---------------------------------------------------
console.log("Todos pares? - Every", arrayEntrada.every(ehPar));


const compras = [
    { data: '2020-01-01', valor: 10.00 },
    { data: '2020-01-15', valor: 20.00 },
    { data: '2020-02-03', valor: 15.00 },
    { data: '2020-04-18', valor: 33.00 },
];

const achaMaiorCompra = (maior, compra) => compra.valor > maior.valor ? compra : maior;
console.log("Maior compra", compras.reduce(achaMaiorCompra));
