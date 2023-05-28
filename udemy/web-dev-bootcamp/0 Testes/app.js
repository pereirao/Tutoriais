const fibonacciGenerator = (n) => {
    let f = [];
    if (n > 0) {
        f.push(0);
    }
    if (n > 1) {
        f.push(1);
    }
    while (f.length < n) {
        f.push(f[f.length - 1] + f[f.length - 2])
    }
    return f;
}

console.log(fibonacciGenerator(100));