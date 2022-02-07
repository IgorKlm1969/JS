/*
С помощью рекурсии организовать функцию возведения числа в степень. 
Формат: function power(val, pow), где val — заданное число, pow –— степень.
*/


'use strict'

function powNum(number, pow) {
    switch (pow) {
        case 0:
            return 1;
        case 1:
            return number;
    }
    return number * powNum(number, --pow);
}

let num = prompt('Введите число:');
let p = prompt('Введите положительную степень:');
alert('Результат: ' + powNum(num, p))