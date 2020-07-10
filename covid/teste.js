const geraMatriz = (n) => {
    let matriz = [];
    for (let index = 0; index < n; index++) {
        matriz.push(parseInt(Math.random() * 10000));
    }
    return matriz;
};

let matriz = geraMatriz(1500);

let aux = 0;

let bottom = last = matriz.length;
while (last > 0) {
    last = 0;
    for (let index = 0; index < bottom; index++) {
    
        if (matriz[index] > matriz[index + 1]) {
            aux = matriz[index + 1];
            matriz[index + 1] = matriz[index];
            matriz[index] = aux;
            last = index;
        }
    }
    bottom = last;
}

console.log(matriz);