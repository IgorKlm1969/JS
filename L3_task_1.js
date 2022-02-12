/*
1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
*/

'use strict'

// function getPrimes(num) {
//     const seive = [];
//     const primes = [];

//     for (let i = 2; i <= num; i++) {
//         if (!seive[i]) {
//             primes.push(i);
//             for (let j = i * i; j <= num; j += i) {
//                 seive[j] = true;
//             }
//         }
//     }


//     return primes;
// }

function getPrimes(num) {
    let seive = [];
    for (let i = 0; i <= num; i++) {
        seive.push(i);
    }


    seive[1] = 0;
    let i = 2;
    let j;

    while (i <= num) {
        if (seive[i]) {
            j = i * 2;
            while (j <= num) {
                seive[j] = 0;
                j += i;

            }
        }
        i++;
    }
    return seive.filter(function (numm) {
        return numm > 0;
    });
}
//console.log(getPrimes(100));
alert(`Простые числа в диапазоне от 0 до 100:\n${getPrimes(100).join(', ')}`);