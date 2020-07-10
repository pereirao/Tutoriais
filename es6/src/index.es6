const arrayIn = [1, 3, 5, 6, 7, 8, 9, 14, 15, 17, 18, 20];

const arrayOut = arrayIn.filter(e => !(e & 1));

console.log(arrayIn, arrayOut);