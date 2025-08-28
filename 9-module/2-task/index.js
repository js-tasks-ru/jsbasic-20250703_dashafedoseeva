import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  constructor() {
    // Свойства для компонентов
    this.carousel = null;
    this.ribbonMenu = null;
    this.stepSlider = null;
    this.cartIcon = null;
    this.cart = null;
    this.productsGrid = null;
  }

  async render() {
    // 1. Carousel
    this.carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);

    // 2. RibbonMenu
    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);

    // 3. StepSlider
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);

    // 4. CartIcon и Cart
    this.cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    // 5. Получаем товары с сервера
    const response = await fetch('products.json');
    const products = await response.json();

    // 6. ProductsGrid
    this.productsGrid = new ProductsGrid(products);
    const productsHolder = document.querySelector('[data-products-grid-holder]');
    productsHolder.innerHTML = ''; // очищаем заглушки
    productsHolder.append(this.productsGrid.elem);

    // 7. Фильтры по умолчанию
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    // 8. События для связи компонентов
    document.body.addEventListener('product-add', event => {
      const product = products.find(p => p.id === event.detail);
      if (product) this.cart.addProduct(product);
    });

    document.body.addEventListener('slider-change', event => {
      this.productsGrid.updateFilter({ maxSpiciness: event.detail });
    });

    document.body.addEventListener('ribbon-select', event => {
      this.productsGrid.updateFilter({ category: event.detail });
    });

    document.getElementById('nuts-checkbox').addEventListener('change', event => {
      this.productsGrid.updateFilter({ noNuts: event.target.checked });
    });

    document.getElementById('vegeterian-checkbox').addEventListener('change', event => {
      this.productsGrid.updateFilter({ vegeterianOnly: event.target.checked });
    });
  }
}

