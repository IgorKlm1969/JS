/*
Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре. 
Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
Пустая корзина должна выводить строку «Корзина пуста»;
Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
* Сделать так, чтобы товары в каталоге выводились при помощи JS:
Создать массив товаров (сущность Product);
При загрузке страницы на базе данного массива генерировать вывод из него. 
HTML-код должен содержать только div id=”catalog” без вложенного кода. Весь вид каталога генерируется JS.
*/


"use strict";

class Product {
    constructor(name, price, quantity = 1, discount = 1, id, categoryId, vendorСode, description, image, dateOfManufacture, shelfLife) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.discount = discount;
        this.id = id;
        this.categoryId = categoryId;
        this.vendorСode = vendorСode;
        this.description = description;
        this.image = image;
        this.dateOfManufacture = dateOfManufacture;
        this.shelfLife = shelfLife;
    }

    showProduct() {
        return JSON.stringify(this, null, 2);
    }

    getResultPrice() {
        return this.price * this.quantity * this.discount;
    }

    getClearPrice() {
        return this.price * this.quantity;
    }

}

class Basket {
    constructor() {
        this.basket = [];
    }

    addProduct(product) {
        this.basket.push(product);
    }

    deleteProduct(id) {
        let idx = this.basket.findIndex(function (item) {
            return item.id == id;
        });
        if (idx >= 0) {
            this.basket.splice(idx, 1);
        }

    }

    increaseQuantity(id, delta = 1) {
        let product = this.basket.find(function (item) {
            return item.id == id;
        });
        product.quantity += delta;
    }

    decreaseQuantity(id, delta = 1) {
        let product = this.basket.find(function (item) {
            return item.id == id;
        });
        if (product.quantity >= delta) {
            product.quantity -= delta;
        }
    }

    sumPrices() {
        return this.basket.reduce(function (acc, product) {
            return acc + product.getClearPrice();
        }, 0);
    }

    sumQuantity() {
        return this.basket.reduce(function (acc, product) {
            return acc + product.quantity;
        }, 0);
    }

    showBasket() {
        return this.basket.map(function (item) {
            return item.showProduct()
        }).join('\n')
    }
}

function createBasket(parentElement, basketObj) {
    let basket = document.createElement('div');
    basket.className = 'basket';
    (basketObj.basket.length == 0) ? basket.insertAdjacentHTML('beforeend', 'Корзина пуста') :
        basket.insertAdjacentHTML('beforeend', `Товаров в корзине: ${basketObj.sumQuantity()}
    <br>На сумму: ${basketObj.sumPrices()} руб.`);
    parentElement.appendChild(basket)
}

function createCatalog(parentElement, products) {
    products.forEach(product => {
        parentElement.insertAdjacentHTML('beforeend',
            `<div class="card">
                <h1 class="card_header">${product.name}</h1>
                <p class="card_text">${product.description}</p>
                <p class="card_price">${product.price} руб.</p>
            </div>`)
    });

}

let products = [
    ['Блокнот', 50, 1, 1, 1, null, null, `Lorem ipsum dolor sit amet consectetur adipisicing elit.`],
    ['Ручка', 500, 1, 1, 2, null, null, `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    `],
    ['Дырокол', 450, 1, 1, 3, null, null, `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    `],
    ['Степлер', 800, 1, 1, 4, null, null, `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    `],
    ['Печать', 900, 1, 1, 5, null, null, `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    `],
    ['Карандаш', 45, 1, 1, 6, null, null, `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    `],
    ['Скрепки', 120, 1, 1, 7, null, null, `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    `],
    ['Календарь', 300, 1, 1, 8, null, null, `Lorem ipsum dolor sit amet consectetur adipisicing elit`],
];

let productsObjList = products.map(item => new Product(...item))
let userBasket = new Basket();
productsObjList.forEach(product => userBasket.addProduct(product))

createBasket(document.querySelector('.header'), userBasket);
createCatalog(document.querySelector('.catalog'), productsObjList);