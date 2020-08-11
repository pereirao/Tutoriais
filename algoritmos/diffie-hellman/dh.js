const public_hash = (o) => {
    return (o.g ** o.s) % o.n;
};

let alice = {
    g: 17,
    n: 648123,
    s: 325
};

console.log(alice.g ** alice.s);

console.log(alice, public_hash(alice));
