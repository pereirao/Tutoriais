function pares(x, y) {
    for (i = 32; i <= 321; i++) {
        var par = i % 2;
        if (par == 0) {
            console.log(i);
        }
    }
}

function temHabilidade(skillCollection, skill) {
    console.log(skillCollection.indexOf(skill) > -1);
}

function experiencia(anos) {
    if (anos <= 1) {
        console.log('Iniciante')
    }
    else if (anos <= 3) {
        console.log('Intermediario')
    }
    else if (anos <= 6) {
        console.log('Avançado')
    }
    else {
        console.log('Master')
    }

}
