"use strict";

var arrayIn = [1, 3, 5, 6, 7, 8, 9, 14, 15, 17, 18, 20];
var arrayOut = arrayIn.filter(function (e) {
  return !(e & 1);
});
console.log(arrayIn, arrayOut);
