/* Продолжаем реализовывать модуль корзины:
- Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы;
- Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида.

* У товара может быть несколько изображений. Нужно:
- Реализовать функционал показа полноразмерных картинок товара в модальном окне;
- Реализовать функционал перехода между картинками внутри модального окна.
*/
"use strict"

class Product {
    constructor(name, price, quantity = 1, discount = 1, id, categoryId, vendorСode, description, image, images, dateOfManufacture, shelfLife) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.discount = discount;
        this.id = id;
        this.categoryId = categoryId;
        this.vendorСode = vendorСode;
        this.description = description;
        this.image = image;
        this.images = images;
        this.dateOfManufacture = dateOfManufacture;
        this.shelfLife = shelfLife;
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
}

function renewBasket(basketObj) {
    let basket = document.querySelector('.basket');
    basket.textContent = '';
    (basketObj.basket.length == 0) ? basket.insertAdjacentHTML('beforeend', 'Корзина пуста') :
        basket.insertAdjacentHTML('beforeend', `товаров в корзине: ${basketObj.sumQuantity()}<br>На сумму: ${basketObj.sumPrices()} рублей`);
}

function createCatalog(parentElement, products) {
    products.forEach(product => {
        parentElement.insertAdjacentHTML('beforeend',
            `<div class="card">
                <h1 class="card_header">${product.name}</h1>
                <p class="card_text">${product.description}</p>
                <img class="card_image" src="${product.image}" data_id="${product.id}">
                <p class="card_price">${product.price} рублей</p>
                <button class="sell_button" data_id="${product.id}">КУПИТЬ</button>
            </div>`)
    });
}

function addToBasket(event) {
    if (event.target.className == 'sell_button') {
        let id = event.target.getAttribute('data_id');
        let product = productsObjList.find(item => item.id == id);
        userBasket.addProduct(product);
        renewBasket(userBasket);
        event.stopPropagation();
    }
}

function openImgBox(event) {
    if (event.target.className == 'card_image') {
        let imgBox = document.querySelector('#img_window');
        let imgList = document.querySelectorAll('.image_box');
        if (imgList) {
            imgList.forEach(item => item.remove());
        }
        imgBox.classList.add('img_visible');
        let id = event.target.getAttribute('data_id');
        let product = productsObjList.find(item => item.id == id);
        product.images.forEach(item => imgBox.insertAdjacentHTML('beforeend',
            `<img src="${item}" class="image_box">`));
        document.querySelector('.image_box').classList.toggle('image_show');
        event.stopPropagation();
    }
}

function closeImgBox(event) {
    if (event.target.className == 'img_close') {
        let imgBox = document.querySelector('#img_window');
        imgBox.classList.remove('img_visible');
        event.stopPropagation();
    }
}

function viewImage(event) {
    let imgList = Array.from(document.querySelectorAll('.image_box'));
    let idx = imgList.findIndex(item => item.className == 'image_box image_show');
    if (event.target.id == 'next') {
        imgList[idx].classList.toggle('image_show');
        (imgList[idx + 1]) ? imgList[idx + 1].classList.toggle('image_show') :
            imgList[0].classList.toggle('image_show');
    }
    if (event.target.id == 'preview') {
        imgList[idx].classList.toggle('image_show');
        (imgList[idx - 1]) ? imgList[idx - 1].classList.toggle('image_show') :
            imgList[imgList.length - 1].classList.toggle('image_show');
    }
    event.stopPropagation();
}

let products = [
    ['Блокнот', 50, 1, 1, 1, null, null, `Lorem ipsum dolor sit amet consectetur adipisicing elit.`, 'img/1/00.jpg',
        ['img/1/00.jpg', 'img/1/01.jpg', 'img/1/02.jpg']],

    ['Ручка', 500, 1, 1, 2, null, null, `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    `, 'img/2/00.jpg',
        ['img/2/00.jpg', 'img/2/01.jpg', 'img/2/02.jpg']],
    ['Дырокол', 450, 1, 1, 3, null, null, `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    `, 'img/3/00.jpg',
        ['img/3/00.jpg', 'img/3/01.jpg', 'img/3/02.jpg']],
    ['Степлер', 800, 1, 1, 4, null, null, `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    `, 'img/4/00.jpg',
        ['img/4/00.jpg', 'img/4/01.jpg', 'img/4/02.jpg']],
    ['Печать', 900, 1, 1, 5, null, null, `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    `, 'img/5/00.jpg',
        ['img/5/00.jpg', 'img/5/01.jpg', 'img/5/02.jpg']],
    ['Карандаш', 45, 1, 1, 6, null, null, `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    `, 'img/6/00.jpg',
        ['img/6/00.jpg', 'img/6/01.jpg', 'img/6/02.jpg']],
    ['Скрепки', 120, 1, 1, 7, null, null, `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    `, 'img/7/00.jpg',
        ['img/7/00.jpg', 'img/7/01.jpg', 'img/7/02.jpg']],
    ['Календарь', 300, 1, 1, 8, null, null, `Lorem ipsum dolor sit amet consectetur adipisicing elit`, 'img/8/00.jpg',
        ['img/8/00.jpg', 'img/8/01.jpg', 'img/8/02.jpg']],
];

let productsObjList = products.map(item => new Product(...item))
let userBasket = new Basket();
let catalog = document.querySelector('.catalog');
let imageBox = document.querySelector('#img_window');
let imgButtons = imageBox.querySelector('.img_buttons');

renewBasket(userBasket);
createCatalog(catalog, productsObjList);
catalog.addEventListener('click', addToBasket);
catalog.addEventListener('click', openImgBox);
imageBox.addEventListener('click', closeImgBox);
imgButtons.addEventListener('click', viewImage);