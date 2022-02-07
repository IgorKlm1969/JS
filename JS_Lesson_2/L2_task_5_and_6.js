/*
5. Реализовать четыре основные арифметические операции в виде функций с двумя параметрами.
Обязательно использовать оператор return
*/

'use strict'

function addNums(num1, num2) {
    return Number(num1) + Number(num2);
}

function subNums(num1, num2) {
    return num1 - num2;
}

function mulNums(num1, num2) {
    return num1 * num2;
}

function divNums(num1, num2) {
    return num1 / num2;
}

/* 

6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости от переданного значения операции выполнить одну из арифметических операций (использовать функции из пункта 5) и вернуть полученное значение (использовать switch).

*/

function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case 'add':
            return addNums(arg1, arg2);
        case 'sub':
            return subNums(arg1, arg2);
        case 'mul':
            return mulNums(arg1, arg2);
        case 'div':
            return divNums(arg1, arg2);
        default:
            return 'Введена недопустимая операция!';
    }
}

let number1 = prompt('Введите первое число:');
let number2 = prompt('Введите второе число:');
let op = prompt('Введите операцию (add, sub, mul, div):');
alert('Результат: ' + mathOperation(number1, number2, op));