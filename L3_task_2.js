/*
2. С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть сущность корзины. Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров. Товары в корзине хранятся в массиве. Задачи:

a) Организовать такой массив для хранения товаров в корзине;
b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
*/

'use strict'

function countBasketPrice(basketArray) {
    return basketArray.reduce(function (acc, price) {
        return acc + price;
    }, 0);
}

let myBasket = [];
let userStr = prompt('Введите цены на товары через пробел:');
myBasket.push(...userStr.split(' ').map(function (elem) {
    return Number(elem);
})
);
alert(`В корзине находятся товары со следующими ценами:\n${myBasket.join(', ')}\nОбщая стоимость  корзины составляет ${countBasketPrice(myBasket)} руб.`);
